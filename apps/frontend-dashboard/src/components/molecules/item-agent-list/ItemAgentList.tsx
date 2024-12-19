"use client";

import React, { useEffect, useState } from "react";
import { useAgent } from "@/context/agent";
import Pagenation from "@/components/molecules/pagenation/Pagenation";
import Loading from "@/components/atoms/loading/Loading";
import ItemAgents from "../item-agengs/ItemAgents";
import AgentDataList from "../agent-data-list/AgentDataList";
import DeleteConfirmationModal from "@/components/atoms/deletePopUp/Delete-Pop-Up";
import { AgentResponseType } from "@/libs/types/api-agents/agent-response";

const ItemAgentList = () => {
    const { agents, loading, error, pagination, fetchAgents, deleteAgent } = useAgent();
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agentToDelete, setAgentToDelete] = useState<string | null>(null);
    const [liveSearch, setLiveSearch] = useState("");
    const [searchState, setSearchState] = useState<AgentResponseType[]>([]);

    // Fetch agents on page load or when pagination changes
    useEffect(() => {
        fetchAgents({ page: currentPage, limit: resultsPerPage });
    }, [currentPage, resultsPerPage, fetchAgents]);

    // Update search results on live search input change
    useEffect(() => {
        if (!agents || agents.length === 0) {
            setSearchState([]);
        } else if (liveSearch.trim() === "") {
            setSearchState(agents); // Show all agents when search is cleared
        } else {
            setSearchState(() => {
                return agents.filter((item) => {
                    const userName = item.userName?.toLowerCase();
                    const address = item.address?.toLowerCase();
                    const email = item.email?.toLowerCase();
                    const phoneNumber = item.phoneNumber?.toString();

                    return (
                        userName?.includes(liveSearch.toLowerCase()) ||
                        address?.includes(liveSearch.toLowerCase()) ||
                        email?.includes(liveSearch.toLowerCase()) ||
                        phoneNumber?.includes(liveSearch.toLowerCase())
                    );
                });
            });
        }
    }, [liveSearch, agents]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLiveSearch(e.target.value); // Update the liveSearch state
    };

    const handleResultsPerPageChange = (newLimit: number) => {
        setResultsPerPage(newLimit);
        setCurrentPage(1);
    };

    const openDeleteModal = (id: string) => {
        setAgentToDelete(id);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setAgentToDelete(null);
    };

    const confirmDelete = async () => {
        if (agentToDelete) {
            try {
                await deleteAgent(agentToDelete);
                fetchAgents({ page: currentPage, limit: resultsPerPage });
                closeDeleteModal();
            } catch (err) {
                console.error("Failed to delete agent:", err);
            }
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}

            {/* Search Input */}
            <AgentDataList liveSearch={liveSearch} onChange={handleChange} />

            {/* Agents List */}
            {!loading && searchState.length > 0 ? (
                <div>
                    {searchState.map((item) => (
                        <ItemAgents
                            key={item._id} // Fixed: Using _id instead of id
                            item={item}
                            onDelete={openDeleteModal} // Pass openDeleteModal to handle delete
                        />
                    ))}

                    {/* Pagination Component */}
                    {pagination && pagination.currentPage > 0 && (
                        <Pagenation
                            currentPage={currentPage}
                            totalResults={pagination.totalAgents}
                            resultsPerPage={resultsPerPage}
                            onPageChange={handlePageChange}
                            onResultsPerPageChange={handleResultsPerPageChange}
                        />
                    )}
                </div>
            ) : (
                <div className="w-full flex items-center justify-center mt-10">
                    <Loading />
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onDelete={confirmDelete}
            />
        </div>
    );
};

export default ItemAgentList;
