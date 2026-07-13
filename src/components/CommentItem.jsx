import { useState } from "react";
import { FaReply, FaTrashAlt } from "react-icons/fa";

export default function CommentItem({ comment, onAddReply, onDeleteComment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    onAddReply(comment.id, replyText);
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div style={styles.commentWrapper}>
      <div style={styles.commentCard}>
        <p style={styles.text}>{comment.text}</p>
        
        {/* Action Bar */}
        <div style={styles.actions}>
          <button 
            style={styles.actionBtn} 
            onClick={() => setIsReplying(!isReplying)}
          >
            <FaReply size={12} /> Reply
          </button>
          
          <button 
            style={{ ...styles.actionBtn, color: "#f4212e" }} 
            onClick={() => onDeleteComment(comment.id)}
          >
            <FaTrashAlt size={12} /> Delete
          </button>
        </div>

        {/* Nested Reply Input */}
        {isReplying && (
          <form onSubmit={handleReplySubmit} style={styles.replyForm}>
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              style={styles.replyInput}
              autoFocus
            />
            <div style={styles.formButtons}>
              <button 
                type="button" 
                style={styles.cancelBtn} 
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </button>
              <button type="submit" style={styles.submitBtn}>
                Reply
              </button>
            </div>
          </form>
        )}
      </div>

      {/* RECURSIVE RENDER: If this comment has replies, render them inside itself */}
      {comment.replies && comment.replies.length > 0 && (
        <div style={styles.nestedReplies}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onAddReply={onAddReply}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  commentWrapper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "8px",
  },
  commentCard: {
    backgroundColor: "#ffffff", 
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #eff3f4",
  },
  text: {
    color: "#0f1419", // Dark charcoal text
    fontSize: "14px",
    margin: "0 0 8px 0",
    wordBreak: "break-word",
  },
  actions: {
    display: "flex",
    gap: "16px",
  },
  actionBtn: {
    background: "none",
    border: "none",
    color: "#536471",
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 0",
  },
  replyForm: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  replyInput: {
    backgroundColor: "#ffffff",
    border: "1px solid #cfd9de",
    borderRadius: "6px",
    padding: "8px",
    color: "#0f1419",
    fontSize: "13px",
    outline: "none",
  },
  formButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
  },
  cancelBtn: {
    background: "none",
    border: "none",
    color: "#536471",
    fontSize: "12px",
    cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#1d9bf0",
    color: "#ffffff",
    border: "none",
    borderRadius: "9999px",
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  nestedReplies: {
    borderLeft: "2px solid #cfd9de", // Light gray thread line
    paddingLeft: "16px",             
    marginLeft: "10px",
  },
};