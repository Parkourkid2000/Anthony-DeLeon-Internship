import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import CountdownTimer from "../home/CountdownTimer";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [exploreItems, setExploreItems] = useState([]);

  async function filterExploreItems(event) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
        event.target.value ? `?filter=${event.target.value}` : ""
      }`
    );
    setExploreItems(data);
    setItems(data.slice(0, visibleItems));
  }

  function loadMore() {
    const nextVisibleItems = visibleItems + 4;
    setVisibleItems(nextVisibleItems);
    setItems(exploreItems.slice(0, nextVisibleItems));
  }

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  useEffect(() => {
    filterExploreItems({ target: { value: "" } });
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={filterExploreItems}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item bg-black opacity-25">
                <div className="nft__item_wrap  "></div>
                <div className="nft__item_info bg-black opacity-25">
                  <h4>title</h4>
                </div>
              </div>
            </div>
          ))
        : items.map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate ? (
                  <CountdownTimer expiryDate={item.expiryDate} />
                ) : null}

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
          ))}

      {items.length < exploreItems.length ? (
        <div className="col-md-12 text-center">
          <button
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMore}
          >
            Load more
          </button>
        </div>
      ) : null}
    </>
  );
};

export default ExploreItems;
