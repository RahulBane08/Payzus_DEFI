import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import BImage from "assets/img/img.png";

import { DownloadCard } from "../../../components";

export default class home extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Explore PayZus</h1>
                </div>
              </div>

              <div className="row why_payzus_row">
                <h3>Why Buy PZS Token's</h3>
                <div className="main__card">
                  <div className="col-lg-8 col-md-10 my_download__card">
                    <img
                      src={require("../../../assets/img/Payzus-World-Class-Defi-Platform.PNG")}
                      alt=""
                    />
                    <a
                      href={require("../../../assets/pdf/Payzus-World-Class-Defi-Platform.pdf")}
                      target="_blank"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="row yt-thumbnail-wrapper"
                style={{ width: 100 + "%" }}
              >
                <div className="col-lg-10 col-md-10 landing__context">
                  <iframe
                    width="100%"
                    height="415"
                    src="https://www.youtube.com/embed/o33NQKmjDsg?rel=0"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="row download__card__wrapper">
                <DownloadCard
                  imgPath={require("../../../assets/img/Payzus-Whitepaper.PNG")}
                  url={require("../../../assets/pdf/Payzus-Whitepaper.pdf")}
                />

                <DownloadCard
                  imgPath={require("../../../assets/img/Payzus-Defi-Platform.PNG")}
                  url={require("../../../assets/pdf/Payzus-Defi-Platform.pdf")}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
