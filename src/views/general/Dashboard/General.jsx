import React from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";

import { StatsCard, DownloadCard } from "../../../components";

import { Line } from "react-chartjs-2";

import {
  dashboardAllProductsChart,
  //dashboardAllProductsChart1,
} from "variables/general/dashboard-charts.jsx";

//import CountTo from 'react-count-to';
import web3 from "web3";
import swal from "sweetalert";
import firebaseApp from "../../../firebase-config";
import PayzusContractABI from "../../../contracts/PAYZUS.json";
import ReferralContractABI from "../../../contracts/pyzusReferral.json";
import generateElement from "../../../generateElement";

const database = firebaseApp.database().ref("Payzus");

class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [],
      rewards: 0,
      firstPersonRewards: 0,
      secondPersonRewards: 0,
      thirdPersonRewards: 0,
      fourthPersonRewards: 0,
      fifthPersonRewards: 0,
      sixthPersonRewards: 0,
      seventhPersonRewards: 0,
      directReferred: 0,
      indirectReferred: 0,
      referrerAddress: "0x00",
      referrerName: "",
      tokenBalance: 0,
      account: null,
      indirectRewards: 0,
      totalTokenBalance: 0,
      usdtBalnce: 0,
      pzsValue: 0,
    };
  }

  componentDidMount = async () => {
    let temp;

    try {
      const Web3 = new web3(web3.givenProvider);
      const accounts = await Web3.eth.getAccounts();
      await this.setState({ account: accounts[0] });

      const PayzusContract = new Web3.eth.Contract(
        PayzusContractABI,
        "0x96b37f38ad1c9c4894a681fdec45fe6b82bad1ee"
      );

      // const balance = await PayzusContract.methods
      //   .balanceOf(this.state.account)
      //   .call();

      // await this.setState({ tokenBalance: balance });

      // const ReferralContract = new Web3.eth.Contract(ReferralContractABI, "0x623d2b987dcde40bc73f678b9ae57936ab32e112");
      // console.log(ReferralContract)
      // const result = await ReferralContract.methods.accounts(this.state.account).call();

      // await this.setState({rewards:result.reward, directReferred:result.referredCount, indirectReferred:result.referredCountIndirect, referrerAddress:result.referrer});
      var sample = 0;

      // let totalToken = 0;
      let totalToken = 3000000;

      let tokenSold = 0,
        remainingToken = 0;

      // Fetching Total Tokens Value from DB
      // database.child("Counter_Balance_Tokens").once("value", (snapshot) => {
      //   totalToken = snapshot.val();

      //   // console.log("Total Token in DB =>", totalToken);
      // });

      firebaseApp.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          // console.log(uid)

          database.child(uid).once("value", (snapshot) => {
            temp = snapshot.val();

            let usdValue = Number(temp.USDTBalance);

            this.setState(
              {
                rewards: temp.Rewards,
                directReferred: temp.DirectReferred,
                indirectReferred: temp.IndirectReferred,
                referrerAddress: temp.ParentAddress,
                firstPersonRewards: temp.FirstPersonRewards,
                secondPersonRewards: temp.SecondPersonRewards,
                thirdPersonRewards: temp.ThirdPersonRewards,
                fourthPersonRewards: temp.FourthPersonRewards,
                fifthPersonRewards: temp.FifthPersonRewards,
                sixthPersonRewards: temp.SixthPersonRewards,
                seventhPersonRewards: temp.SeventhPersonRewards,
                totalTokenBalance: temp.TokenBalance,
                usdtBalnce: usdValue,
              },
              () => {
                database
                  .child(this.state.referrerAddress + "/Name")
                  .once("value", (name) => {
                    this.state.referrerName = name.val();
                  })
                  .then(() => {
                    this.setState(
                      {
                        rewards:
                          this.state.firstPersonRewards +
                          this.state.secondPersonRewards +
                          this.state.thirdPersonRewards +
                          this.state.fourthPersonRewards +
                          this.state.fifthPersonRewards +
                          this.state.sixthPersonRewards +
                          this.state.seventhPersonRewards,

                        indirectRewards:
                          this.state.secondPersonRewards +
                          this.state.thirdPersonRewards +
                          this.state.fourthPersonRewards +
                          this.state.fifthPersonRewards +
                          this.state.sixthPersonRewards +
                          this.state.seventhPersonRewards,

                        // totalTokenBalance:
                        //   this.state.totalTokenBalance +
                        //   this.state.firstPersonRewards +
                        //   this.state.secondPersonRewards +
                        //   this.state.thirdPersonRewards +
                        //   this.state.fourthPersonRewards +
                        //   this.state.fifthPersonRewards +
                        //   this.state.sixthPersonRewards +
                        //   this.state.seventhPersonRewards,
                      },
                      async () => {
                        await database.once("value", (snapshot) => {
                          //console.log("ABC",snapshot.val())
                          snapshot.forEach((childSnapshot) => {
                            // console.log(childSnapshot.val().ParentAddress)

                            if (childSnapshot.val().ParentAddress === uid) {
                              sample++;
                              //console.log("XYZ",this.state.directReferred)
                            }
                          });
                        });
                        //console.log("YY",sample)
                        database.child(uid).update({ DirectReferred: sample });
                        database
                          .child(uid)
                          .update({ Rewards: this.state.rewards });
                      }
                    );
                  });
              }
            );

            // console.log(this.state.rewards)
          });

          // Method - 1 : Fetching Remaining Tokens Value for Counter
          // database.child("Counter_Balance_Tokens").once("value", (snapshot) => {
          //   let temp = snapshot.val();

          //   console.log(temp);

          //   this.setState({
          //     pzsValue: temp,
          //   });
          // });

          // Method - 2 :  Fetching Remaining Tokens Value for Counter
          database.once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              let userTokenBalance = childSnapshot.val().TokenBalance;

              if (userTokenBalance > 0) {
                console.log("User Token Balance", userTokenBalance);

                tokenSold += userTokenBalance;

                console.log("Token Sold", tokenSold);
              }
            });

            remainingToken = totalToken - tokenSold;

            console.log("Token Remaining : ", remainingToken);

            this.setState({
              pzsValue: remainingToken,
            });
          });

          // database.child("Counter_Balance_Tokens").update(remainingToken);
        } else {
          // this.props.history.push("/home/login")
          window.location.href = "/login";
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  truncate(str) {
    return str.length > 10
      ? str.substring(0, 6) + "..." + str.substring(38, 42)
      : str;
  }

  handleWithdraw = () => {
    swal({
      content: generateElement(`Will be available in 48 hours`),
      icon: "info",
    });
  };

  render() {
    const directReferred = this.state.directReferred;
    return (
      <div>
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-right">
                  {/* <Button color="primary">Add funds</Button>
                          <Button color="primary">send</Button> */}
                  {/* <Button color="primary" onClick={this.handleWithdraw}>Withdraw PZS Rewards</Button> */}

                  <Button
                    color="primary"
                    className="withdraw-btn"
                    onClick={this.handleWithdraw}
                  >
                    Withdraw PZS Rewards
                  </Button>
                </div>
              </div>

              <div className="row latoken__row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="latoken__banner__card">
                    <img
                      src={require("../../../assets/img/latoken.jpeg")}
                      alt="Card Image Cap"
                    />
                    <div>
                      <h1>Purchase PZS from LATOKEN</h1>
                      <a
                        className="latoken__button"
                        href="https://latoken.com/ieo/PZS"
                        target="_blank"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clearfix"></div>

              <div
                className="row"
                style={{
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="col-lg-12"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="col-lg-5 col-md-6 col-sm-6">
                    <StatsCard
                      title="Token Remaining, Hurry Up!"
                      pzs={this.state.pzsValue}
                    >
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="17.5"
                          cy="17.5"
                          r="17.5"
                          fill="#E2574C"
                          fill-opacity="0.2"
                        />
                        <path
                          d="M17.5 0C7.83558 0 0 7.83558 0 17.5C0 27.1655 7.83558 35 17.5 35C27.1655 35 35 27.1666 35 17.5C35 7.83558 27.1654 0 17.5 0ZM17.5 31.7187C9.64692 31.7187 3.2813 25.3531 3.2813 17.5C3.2813 9.64692 9.64692 3.2813 17.5 3.2813C25.3531 3.2813 31.7187 9.64692 31.7187 17.5C31.7187 25.3531 25.3531 31.7187 17.5 31.7187ZM17.5011 7.67481C16.2477 7.67481 15.2993 8.32892 15.2993 9.38545V19.0761C15.2993 20.1337 16.2476 20.7856 17.5011 20.7856C18.7239 20.7856 19.7029 20.1064 19.7029 19.0761V9.38545C19.7028 8.354 18.7239 7.67481 17.5011 7.67481ZM17.5011 22.9688C16.2969 22.9688 15.3168 23.9488 15.3168 25.154C15.3168 26.3571 16.2969 27.3372 17.5011 27.3372C18.7053 27.3372 19.6843 26.3571 19.6843 25.154C19.6842 23.9487 18.7053 22.9688 17.5011 22.9688Z"
                          fill="#E2574C"
                        />
                      </svg>
                    </StatsCard>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="row stats-cards-row">
                    <div className="col-lg-5 col-md-6 col-sm-6">
                      <StatsCard
                        title="Total Balance"
                        pzs={
                          directReferred < 3
                            ? this.state.totalTokenBalance +
                              this.state.firstPersonRewards
                            : directReferred >= 3
                            ? this.state.totalTokenBalance +
                              this.state.firstPersonRewards +
                              this.state.secondPersonRewards +
                              this.state.thirdPersonRewards +
                              this.state.fourthPersonRewards +
                              this.state.fifthPersonRewards +
                              this.state.sixthPersonRewards +
                              this.state.seventhPersonRewards
                            : 0
                        }
                      >
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="17.5"
                            cy="17.5"
                            r="17.5"
                            fill="#00D395"
                            fill-opacity="0.2"
                          />
                          <path
                            d="M24.0844 12.0312H10.9397C10.3349 12.0312 9.84379 12.5213 9.84379 13.125V15.3124C9.84379 15.9172 10.3349 16.4062 10.9397 16.4062H24.0844C24.6903 16.4062 25.1803 15.9172 25.1803 15.3124V13.125C25.1792 12.5224 24.6892 12.0312 24.0844 12.0312ZM17.5 0C7.83558 0 0 7.83558 0 17.5C0 27.1655 7.83558 35 17.5 35C27.1644 35 35 27.1655 35 17.5C35 7.83558 27.1644 0 17.5 0ZM17.5 31.7187C9.64692 31.7187 3.2813 25.3531 3.2813 17.5C3.2813 9.64692 9.64692 3.2813 17.5 3.2813C25.3531 3.2813 31.7187 9.64692 31.7187 17.5C31.7187 25.3531 25.3531 31.7187 17.5 31.7187ZM24.0844 18.5937H10.9397C10.3349 18.5937 9.84379 19.0838 9.84379 19.6875V21.8749C9.84379 22.4797 10.3349 22.9686 10.9397 22.9686H24.0844C24.6903 22.9686 25.1803 22.4797 25.1803 21.8749V19.6875C25.1792 19.0849 24.6892 18.5937 24.0844 18.5937Z"
                            fill="#00D395"
                          />
                        </svg>
                      </StatsCard>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-6">
                      <StatsCard
                        title="Total Rewards"
                        pzs={directReferred > 2 ? this.state.reward : 0}
                      >
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="17.5"
                            cy="17.5"
                            r="17.5"
                            fill="#D10017"
                            fill-opacity="0.2"
                          />
                          <circle
                            cx="17.5"
                            cy="17.5"
                            r="15.75"
                            stroke="#D10017"
                            stroke-width="3.5"
                          />
                          <path
                            d="M26.9741 14.5201C26.9121 14.3292 26.7471 14.19 26.5485 14.1612L20.9684 13.3503L18.4729 8.29394C18.3841 8.11394 18.2007 8 18 8C17.7993 8 17.616 8.11394 17.5271 8.29394L15.0315 13.3503L9.45151 14.1612C9.25291 14.19 9.08785 14.3292 9.02584 14.5201C8.96378 14.711 9.01553 14.9206 9.15929 15.0607L13.1969 18.9965L12.2439 24.5541C12.2099 24.752 12.2913 24.9519 12.4537 25.0699C12.5455 25.1366 12.6543 25.1706 12.7637 25.1706C12.8476 25.1706 12.9319 25.1506 13.009 25.11L18 22.486L22.9908 25.11C23.1685 25.2034 23.3838 25.1879 23.5461 25.0699C23.7085 24.9519 23.7899 24.7519 23.756 24.5541L22.8027 18.9965L26.8407 15.0606C26.9845 14.9206 27.0362 14.711 26.9741 14.5201Z"
                            fill="#D10017"
                          />
                        </svg>
                      </StatsCard>
                    </div>
                  </div>

                  <div className="row stats-cards-row">
                    <div className="col-lg-5 col-md-6 col-sm-6">
                      <StatsCard
                        title="USDT Balance"
                        pzs={this.state.usdtBalnce.toFixed(3)}
                        valueType="USDT"
                      >
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="17.5"
                            cy="17.5"
                            r="17.5"
                            fill="#FFB404"
                            fill-opacity="0.2"
                          />
                          <path
                            d="M17.5 0C7.85331 0 0 7.85331 0 17.5C0 27.1467 7.85331 35 17.5 35C27.1467 35 35 27.1467 35 17.5C35 7.85331 27.1467 0 17.5 0ZM17.5 31.3771C9.84917 31.3771 3.62293 25.1508 3.62293 17.5C3.62293 9.84917 9.84917 3.62293 17.5 3.62293C25.1508 3.62293 31.3771 9.84917 31.3771 17.5C31.3771 25.1508 25.1508 31.3771 17.5 31.3771Z"
                            fill="#FFB404"
                          />
                          <path
                            d="M20.4866 16.5165C19.6405 16.0465 18.7438 15.6994 17.8543 15.3306C17.3409 15.1209 16.8492 14.8678 16.4153 14.5207C15.562 13.8337 15.7211 12.7273 16.7262 12.2862C17.0083 12.1632 17.3047 12.1198 17.6085 12.1054C18.7727 12.0403 19.8719 12.2572 20.9277 12.7634C21.4483 13.0165 21.6219 12.937 21.8027 12.3946C21.9907 11.8161 22.1498 11.2304 22.3161 10.6519C22.4318 10.2614 22.2872 10.001 21.9184 9.84194C21.2459 9.54545 20.5516 9.32851 19.8213 9.22004C18.874 9.06818 18.874 9.06818 18.8667 8.11364C18.8595 6.76136 18.8595 6.76136 17.5145 6.76859C17.3192 6.76859 17.124 6.76136 16.9287 6.76859C16.2996 6.79029 16.1911 6.89876 16.1766 7.52789C16.1694 7.80992 16.1766 8.09917 16.1766 8.3812C16.1694 9.22727 16.1694 9.21281 15.3595 9.50207C13.407 10.2107 12.1994 11.5413 12.0692 13.6746C11.9535 15.562 12.937 16.8347 14.4845 17.7603C15.439 18.3316 16.4948 18.6715 17.5072 19.1198C17.905 19.2934 18.281 19.4959 18.6064 19.7707C19.5826 20.5733 19.4019 21.9112 18.2448 22.4174C17.6229 22.6849 16.9721 22.7572 16.3068 22.6705C15.2727 22.5403 14.282 22.2727 13.3564 21.7882C12.814 21.5062 12.655 21.5785 12.4669 22.1715C12.3078 22.6849 12.1632 23.1983 12.0258 23.7118C11.8378 24.406 11.9029 24.5723 12.5682 24.8905C13.407 25.2955 14.3109 25.5052 15.2293 25.657C15.9452 25.7727 15.9742 25.8017 15.9814 26.5465C15.9814 26.8864 15.9886 27.2262 15.9886 27.5589C15.9959 27.9855 16.1983 28.2314 16.6395 28.2386C17.1384 28.2459 17.6374 28.2459 18.1364 28.2386C18.5413 28.2314 18.751 28.0072 18.7583 27.595C18.7583 27.1322 18.78 26.6694 18.7655 26.2066C18.7438 25.7366 18.9463 25.4979 19.4019 25.375C20.4432 25.093 21.3326 24.5289 22.0196 23.6973C23.8998 21.3833 23.1766 18.0062 20.4866 16.5165Z"
                            fill="#FFB404"
                          />
                        </svg>
                      </StatsCard>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-6">
                      <StatsCard
                        title="Direct Rewards"
                        pzs={this.state.firstPersonRewards}
                      >
                        <svg
                          width="35"
                          height="35"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="17.5"
                            cy="17.5"
                            r="17.5"
                            fill="#8B4513"
                            fill-opacity="0.2"
                          />
                          <path
                            d="M17.5 0C7.83558 0 0 7.83558 0 17.5C0 27.1655 7.83558 35 17.5 35C27.1644 35 35 27.1655 35 17.5C35 7.83668 27.1644 0 17.5 0ZM17.5 31.7187C9.64692 31.7187 3.2813 25.3531 3.2813 17.5C3.2813 9.64692 9.64692 3.2824 17.5 3.2824C25.3531 3.2824 31.7187 9.64692 31.7187 17.5C31.7187 25.3531 25.3531 31.7187 17.5 31.7187ZM23.8229 16.4063H20.7812V10.9375C20.7812 10.3338 20.2923 9.84379 19.6875 9.84379H15.3124C14.7087 9.84379 14.2187 10.3338 14.2187 10.9375V16.4063H11.176C9.98927 16.4063 9.50364 17.1971 10.0965 18.1606L16.4205 24.4124C17.0133 25.3771 17.9845 25.3771 18.5784 24.4124L24.9013 18.1606C25.4964 17.1971 25.0107 16.4063 23.8229 16.4063Z"
                            fill="#8B4513"
                          />
                        </svg>
                      </StatsCard>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row  rewards__row">
                <div className="col-lg-10 col-md-10 col-sm-10">
                  <div className="rewards__levels__wrapper">
                    <h1>Your Upline: {this.state.referrerName}</h1>

                    <div className="rewards__levels">
                      <div className="row rewards__cards__row col-lg-12">
                        <div className="col-lg-5 col-md-5 col-sm-5 rewards__card">
                          <h1>
                            {directReferred > 2
                              ? this.state.secondPersonRewards
                              : 0}{" "}
                            <span>PZS</span>
                          </h1>
                          <p>First Level Rewards</p>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 rewards__card">
                          <h1>
                            {directReferred > 2
                              ? this.state.thirdPersonRewards
                              : 0}{" "}
                            <span>PZS</span>
                          </h1>
                          <p>Second Level Rewards</p>
                        </div>
                      </div>

                      <div className="row rewards__cards__row col-lg-12">
                        <div className="col-lg-5 col-md-5 col-sm-5 rewards__card">
                          <h1>
                            {directReferred > 2
                              ? this.state.fourthPersonRewards
                              : 0}{" "}
                            <span>PZS</span>
                          </h1>
                          <p>Third Level Rewards</p>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 rewards__card">
                          <h1>
                            {directReferred > 2
                              ? this.state.fifthPersonRewards
                              : 0}{" "}
                            <span>PZS</span>
                          </h1>
                          <p>Fourth Level Rewards</p>
                        </div>
                      </div>

                      <div className="row rewards__cards__row col-lg-12">
                        <div className="col-lg-5 col-md-5 col-sm-5 rewards__card">
                          <h1>
                            {directReferred > 2
                              ? this.state.sixthPersonRewards
                              : 0}{" "}
                            <span>PZS</span>
                          </h1>
                          <p>Fifth Level Rewards</p>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 rewards__card">
                          <h1>
                            {directReferred > 2
                              ? this.state.seventhPersonRewards
                              : 0}{" "}
                            <span>PZS</span>
                          </h1>
                          <p>Six Level Rewards</p>
                        </div>
                      </div>
                    </div>
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

              <div className="row  download__card__wrapper">
                <DownloadCard
                  imgPath={require("../../../assets/img/Payzus-Whitepaper.PNG")}
                  url={require("../../../assets/pdf/Payzus-Whitepaper.pdf")}
                />

                <DownloadCard
                  imgPath={require("../../../assets/img/Payzus-Defi-Platform.PNG")}
                  url={require("../../../assets/pdf/Payzus-Defi-Platform.pdf")}
                />
              </div>

              {/* <div
                className="row"
                style={{
                  margin: "20px 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="col-lg-10"
                  style={{ backgroundColor: "white", padding: "30px" }}
                >
                  <div className="chart-container">
                    <div className="chart-area" style={{ height: "300px" }}>
                      <Line
                        data={dashboardAllProductsChart.data}
                        options={dashboardAllProductsChart.options}
                      />
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="row margin-0">
                <div className="col-12 col-lg-12 col-xl-12 col-md-12">
                  <section className="box">
                    <header className="panel_header">
                      <h2 className="title float-left">Balance</h2>
                    </header>
                    <div className="content-body">
                      {" "}
                      <div className="row">
                        <div className="row margin-0 graph-wrapper-row">
                          <div className="col-10 col-lg-10 col-xl-10 col-md-10">
                            <section className="box">
                              <header className="panel_header">
                                <h2 className="title float-left">Balance</h2>
                              </header>
                              <div className="content-body"></div>
                            </section>
                          </div>{" "}
                          <div className="col-12 col-lg-5 col-md-5 col-xl-4">
                            <div className="col-12 col-lg-5 col-md-5 col-xl-4">
                              <section className="box ">
                                <header className="panel_header">
                                  <h2 className="title float-left">
                                    {" "}
                                    Payzus Token Stats
                                  </h2>
                                </header>
                                <div className="content-body">
                                  {" "}
                                  <div className="row margin-0">
                                    <div className="col-12">
                                      <div className="wid-vectormap mapsmall">
                                        <div className="row">
                                          <div
                                            style={{
                                              width: 100 + "%",
                                              height: 220,
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: 100 + "%",
                                                height: 280,
                                              }}
                                            >
                                              <ul style={{ marginTop: "30px" }}>
                                                <p>
                                                  <li>
                                                    Token Balance{" "}
                                                    <span
                                                      style={{ float: "right" }}
                                                    >
                                                      {this.state.tokenBalance /
                                                        10 ** 18}{" "}
                                                      PZS
                                                    </span>
                                                  </li>
                                                </p>
                                                <p>
                                                  <li>
                                                    Total Rewards{" "}
                                                    <span
                                                      style={{ float: "right" }}
                                                    >
                                                      {this.state.rewards} PZS
                                                    </span>
                                                  </li>
                                                </p>
                                                <p>
                                                  <li>
                                                    Direct Rewards{" "}
                                                    <span
                                                      style={{ float: "right" }}
                                                    >
                                                      {
                                                        this.state
                                                          .firstPersonRewards
                                                      }{" "}
                                                      PZS
                                                    </span>
                                                  </li>
                                                </p>
                                                <p>
                                                  <li>
                                                    Indirect Rewards{" "}
                                                    <span
                                                      style={{ float: "right" }}
                                                    >
                                                      {
                                                        this.state
                                                          .indirectRewards
                                                      }{" "}
                                                      PZS
                                                    </span>
                                                  </li>
                                                </p>
                                                <p>
                                                  <li>
                                                    Your Referrer{" "}
                                                    <span
                                                      style={{ float: "right" }}
                                                    >
                                                      {this.state.referrerName}{" "}
                                                      PZS
                                                    </span>
                                                  </li>
                                                </p>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                          <div className="row margin-0">
                            <div className="col-12 col-lg-5 col-md-6">
                              <section className="box ">
                                <header className="panel_header">
                                  <h2 className="title float-left">
                                    All Assets
                                  </h2>
                                </header>
                                <div className="content-body">
                                  {" "}
                                  <div className="row">
                                    <div className="col-12">
                                      <div className="chart-container"></div>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div> */}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default General;
