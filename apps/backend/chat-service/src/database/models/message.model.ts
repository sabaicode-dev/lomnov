import mongoose from "mongoose";
interface IMessage {
  senderId: string;// sub
  receiverId: string;// sub
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
  conversationId: mongoose.Schema.Types.ObjectId;
  isRead: boolean;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    senderId: {type: String,ref: "users",require: true,unique: false},
    receiverId: {type: String,ref: "users",require: true,unique: false},
    message: {type: String,require: true,},
    conversationId: {type: mongoose.Schema.Types.ObjectId,ref: "Conversation"},
    isRead: {type: Boolean, default: false}
  },
  //createAt,updateAt
  {
    timestamps: true,
    toObject: {
      transform: function (_doc, ret) {
        delete ret.__v;
        ret._id = ret._id.toString();
      },
    },
    versionKey: false,
  }
);

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);
export default MessageModel;
