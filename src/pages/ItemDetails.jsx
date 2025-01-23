import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams, useSearchParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();

  const [loading, setLoading] = useState(true);

  const [nftDetails, setNftDetails] = useState([]);

  async function fetchNftDetails() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    setNftDetails(data);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // After 2 seconds, set loading to false
    }, 2000);

    // Cleanup function
    return () => {
      clearTimeout(timer); // Clears the timeout if the component unmounts or before the effect runs again
      // console.log('Timer cleared!');
    };
  }, []); // Empty dependency array - this effect runs once on mount

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchNftDetails();
  }, []);

  

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0 ">
          <div className="container  ">
            <div className="row  ">
              {loading ? (
                <>
                  <div className="col-md-6 text-center bg-black opacity-25  ">
                    <img
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 className="bg-black opacity-25 text-black mt-2">
                        nfttitle + tag #000
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views bg-black opacity-25 text-black">
                          <i className="fa fa-eye"></i>
                          000
                        </div>
                        <div className="item_info_like bg-black opacity-25 text-black">
                          <i className="fa fa-heart"></i>
                          000
                        </div>
                      </div>
                      <p className="bg-black opacity-25 text-black">
                        nft descripltion Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Pariatur dolores soluta quidem error
                        eos et quis tempore dignissimos dicta corporis dolore
                        ab, quam repudiandae ullam rem. Voluptatem quae amet
                        dignissimos?
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <a>
                                <img className="lazy" alt="" />
                              </a>
                            </div>
                            <div className="author_list_info bg-black opacity-25 text-black">
                              <a>ownername</a>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <a>
                                <img className="lazy" alt="" />
                              </a>
                            </div>
                            <div className="author_list_info bg-black opacity-25 text-black">
                              <a>creatorname</a>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span className="bg-black opacity-25 text-black">
                            0.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center   ">
                    <img
                      src={nftDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {nftDetails.title} #{nftDetails.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftDetails.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftDetails.likes}
                        </div>
                      </div>
                      <p>{nftDetails.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftDetails.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={nftDetails.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftDetails.ownerId}`}>
                                {nftDetails.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftDetails.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={nftDetails.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftDetails.creatorId}`}>
                                {nftDetails.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nftDetails.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
