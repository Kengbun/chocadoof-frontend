import React from "react";
import BrandCard from "./BrandCard";

// นำเข้าโลโก้
import royalCanin from "./jerhigh.jpg";
import nekko from "./jerhigh.jpg";
import buzz from "./jerhigh.jpg";
import jerhigh from "./jerhigh.jpg";
import marvo from "./jerhigh.jpg";
import regalo from "./jerhigh.jpg";
import monchou from "./jerhigh.jpg";
import moochie from "./jerhigh.jpg";
import ciao from "./jerhigh.jpg";

const brands = [
  { logo: royalCanin, name: "Royal Canin" },
  { logo: nekko, name: "Nekko" },
  { logo: buzz, name: "Buzz" },
  { logo: jerhigh, name: "JerHigh" },
  { logo: marvo, name: "Marvo" },
  { logo: regalo, name: "Regalo" },
  { logo: monchou, name: "Monchou" },
  { logo: moochie, name: "Moochie" },
  { logo: ciao, name: "Ciao" },
];

const BrandGrid = () => {
  return (
    <div style={styles.grid}>
      {brands.map((brand, index) => (
        <BrandCard key={index} logo={brand.logo} name={brand.name} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
};

export default BrandGrid;
