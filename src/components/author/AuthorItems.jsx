import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ nftCollection=[], authorImage }) => {
  const [loading, setLoading ] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 2000)

  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">

          {
            loading ? 
            (
              new Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy"  alt="" />
                        
                      </Link>
                    </div>
                    <div className="nft__item_wrap bg-black opacity-25 text-black mb-2">
                      <div className="nft__item_extra ">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <a >
                        <img
                          
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="nft__item_info">
                      <a className="">
                        <h4 className="bg-black opacity-25 text-black">default title</h4>
                      </a>
                      <div className="nft__item_price">0.00 ETH</div>
                      <div className="nft__item_like bg-black opacity-25 text-black">
                        <i className="fa fa-heart"></i>
                        <span className="text-black">000</span>
                      </div>
                    </div>
                  </div>
                </div>
    
    
              ))
            )
            :
            (
              nftCollection.map((item, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
    
    
              ))
            )

          }

        
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
