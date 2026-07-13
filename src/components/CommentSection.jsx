import { useState } from "react";
import CommentItem from "./CommentItem";

export default function CommentSection({ showCommentBox }) {
  const [comments, setComments] = useState([]);
  const [inputText, setInputText] = useState("");

  const addReplyToTree = (commentTree, targetId, newReply) => {
    return commentTree.map((comment) => {
      if (comment.id === targetId) {
        return {
          ...comment,
          replies: [newReply, ...comment.replies],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToTree(comment.replies, targetId, newReply),
        };
      }
      return comment;
    });
  };

  const deleteFromTree = (commentTree, targetId) => {
    return commentTree
      .filter((comment) => comment.id !== targetId)
      .map((comment) => {
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: deleteFromTree(comment.replies, targetId),
          };
        }
        return comment;
      });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: inputText,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setInputText("");
  };

  const onAddReply = (targetId, text) => {
    const newReply = {
      id: Date.now(),
      text: text,
      replies: [],
    };
    setComments((prevComments) => addReplyToTree(prevComments, targetId, newReply));
  };

  const onDeleteComment = (targetId) => {
    setComments((prevComments) => deleteFromTree(prevComments, targetId));
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Comments ({comments.length})</h3>

      {/* Conditionally shows up only when the main "Comment" action button is pressed */}
      {showCommentBox && (
        <form onSubmit={handleAddComment} style={styles.form}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write a comment..."
            style={styles.textarea}
            rows="3"
            autoFocus
                        onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevents a new line from being added
                handleAddComment(e); // Submits the form
                }
            }}
          />
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitBtn}>
              Post Comment
            </button>
          </div>
        </form>
      )}

      <div style={styles.list}>
        {comments.length === 0 ? (
          <p style={styles.placeholderText}>No comments yet. Click the comment button above to start the thread!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onAddReply={onAddReply}
              onDeleteComment={onDeleteComment}
            />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "16px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#0f1419",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
    backgroundColor: "#f7f9f9",
    padding: "12px",
    borderRadius: "12px",
  },
  textarea: {
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #cfd9de",
    borderRadius: "8px",
    padding: "10px",
    color: "#0f1419",
    fontSize: "15px",
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  submitBtn: {
    backgroundColor: "#1d9bf0",
    color: "#ffffff",
    border: "none",
    borderRadius: "9999px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  placeholderText: {
    color: "#536471",
    fontSize: "14px",
    textAlign: "center",
    padding: "20px 0",
  },
};