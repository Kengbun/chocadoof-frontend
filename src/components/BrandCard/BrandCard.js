import React from "react";

const BrandCard = ({ logo, name }) => {
  return (
    <div style={styles.card}>
      <img src={logo} alt={name} style={styles.image} />
      <p style={styles.text}>{name}</p>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  text: {
    marginTop: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default BrandCard;
