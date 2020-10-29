import React from "react";

export default function DownloadCard({ imgPath, url }) {
  return (
    <div className="col-lg-5 col-md-10 download__card">
      <img src={imgPath} alt="" />
      <a href={url} target="_blank">
        Download
      </a>
    </div>
  );
}
