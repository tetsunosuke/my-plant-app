import React, { useState, useEffect } from "react";

import "../../styles.css";
import { Input } from "@douyinfe/semi-ui";

const PlantName = (props: any) => {
  const plantDetails = props?.plantDetails;
  useEffect(() => {
    if (plantDetails) {
      props.handleValueChange("popularName", plantDetails.plantPopularName);
      props.handleValueChange(
        "officialName",
        plantDetails.plantOfficialName || null
      );
      props.handleValueChange("family", plantDetails.plantFamily || null);
    }
  }, [plantDetails]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        marginTop: "-20px",
      }}
    >
      <div>
        <span className="input-title">通称</span>
        <Input
          name="plantPopularName"
          className="input-increase-plants-name"
          defaultValue={plantDetails?.plantPopularName || ""}
          onChange={(e) => props.handleValueChange("popularName", e)}
        />
      </div>
      <div>
        <span className="input-title" style={{ marginRight: "240px" }}>
          正式名称
        </span>
        <Input
          name="plantOfficialName"
          className="input-increase-plants-name"
          defaultValue={plantDetails?.plantOfficialName || ""}
          onChange={(e) => props.handleValueChange("officialName", e)}
        />
      </div>
      <div>
        <span className="input-title">科名</span>

        <Input
          name="plantFamily"
          className="input-increase-plants-name"
          defaultValue={plantDetails?.plantFamily || ""}
          onChange={(e) => props.handleValueChange("family", e)}
        />
      </div>
    </div>
  );
};

export default PlantName;
