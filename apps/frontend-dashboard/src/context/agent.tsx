'use client';

import React, { createContext, ReactNode, useContext, useState, useCallback } from "react";
import axiosInstance from "@/libs/axios";
import { AgentResponseType } from "@/libs/types/api-agents/agent-response";
import { API_ENDPOINTS } from "@/libs/const/api-endpionts";

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalAgents: number;
}

interface AgentContextType {
    agents: AgentResponseType[];
    loading: boolean;
    error: string | null;
    pagination: PaginationData | null;
    fetchAgents: (params?: { page?: number; limit?: number }) => Promise<void>;
    deleteAgent: (id: string) => Promise<void>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider = ({ children }: { children: ReactNode }) => {
    const [agents, setAgents] = useState<AgentResponseType[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch agents with pagination
    const fetchAgents = useCallback(
        async (params: { page?: number; limit?: number } = { page: 1, limit: 10 }) => {
            setLoading(true);
            setError(null);
            try {
                const queryString = new URLSearchParams(params as Record<string, string>).toString();
                const response = await axiosInstance.get(`${API_ENDPOINTS.USER}?${queryString}`);
                console.log("API Response:", response.data);
                setAgents(response.data.agents);
                setPagination(response.data.pagination);
            } catch (err) {
                console.error("Error fetching agents:", err);
                setError("Failed to load agents.");
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // Delete an agent by ID
    const deleteAgent = useCallback(
        async (id: string) => {
            setLoading(true);
            setError(null);
            try {
                await axiosInstance.delete(`${API_ENDPOINTS.USER}/${id}`);
                // Update the local state to remove the deleted agent
                setAgents((prevAgents) => prevAgents.filter((agent) => agent._id !== id));
            } catch (err) {
                console.error("Error deleting agent:", err);
                setError("Failed to delete the agent.");
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return (
        <AgentContext.Provider
            value={{
                agents,
                loading,
                error,
                pagination,
                fetchAgents,
                deleteAgent,
            }}
        >
            {children}
        </AgentContext.Provider>
    );
};

export const useAgent = () => {
    const context = useContext(AgentContext);
    if (!context) {
        throw new Error("useAgent must be used within an AgentProvider");
    }
    return context;
};
