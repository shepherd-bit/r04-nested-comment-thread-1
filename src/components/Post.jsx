import { useState } from "react";
import { 
  FaRegHeart, 
  FaHeart, 
  FaRegBookmark, 
  FaBookmark, 
  FaRegComment, 
  FaShare 
} from "react-icons/fa";
import CommentSection from "./CommentSection";

export default function Post() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);

  return (
    <div style={styles.postContainer}>
      {/* Post Caption */}
      <p style={styles.caption}>The new bad boy on the track...</p>

      {/* F1 Car Image */}
      <div style={styles.imageContainer}>
        <img 
          src="public/image-F1-front.webp" 
          alt="F1 Racing Car" 
          style={styles.image}
        />
      </div>

      {/* Action Buttons Grid */}
      <div style={styles.buttonRow}>
        <button 
          style={{ ...styles.actionButton, color: liked ? "#f91880" : "#536471" }} 
          onClick={() => setLiked(!liked)}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
          <span style={styles.buttonText}>1.2k</span>
        </button>

        <button 
          style={{ ...styles.actionButton, color: bookmarked ? "#1d9bf0" : "#536471" }} 
          onClick={() => setBookmarked(!bookmarked)}
        >
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
          <span style={styles.buttonText}>432</span>
        </button>

        {/* ACTIVE COMMENT BUTTON: Toggles the comment section below */}
        <button 
          style={{ ...styles.actionButton, color: showCommentBox ? "#00ba7c" : "#536471" }}
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <FaRegComment />
          <span style={styles.buttonText}>Comment</span>
        </button>

        <button style={styles.actionButton}>
          <FaShare />
        </button>
      </div>

      <hr style={styles.divider} />

      {/* Passes down whether the input box should be visible */}
      <CommentSection showCommentBox={showCommentBox} />
    </div>
  );
}

const styles = {
  postContainer: {
    backgroundColor: "#ffffff", 
    color: "#0f1419",
    borderRadius: "16px",
    padding: "16px",
    border: "1px solid #eff3f4",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  caption: {
    fontSize: "19px",
    fontWeight: "bold",
    margin: "0 0 12px 0",
  },
  imageContainer: {
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #eff3f4",
    marginBottom: "12px",
  },
  image: {
    width: "100%",
    display: "block",
    maxHeight: "400px",
    objectFit: "cover",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 12px",
    maxWidth: "400px",
  },
  actionButton: {
    background: "none",
    border: "none",
    color: "#536471",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px",
    borderRadius: "50%",
  },
  buttonText: {
    fontSize: "14px",
    fontWeight: "500",
  },
  divider: {
    border: "0",
    height: "1px",
    background: "#eff3f4",
    margin: "16px 0",
  }
};