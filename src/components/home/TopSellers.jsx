import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopSellers(data);
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
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5 ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration="750"
              data-aos-once="true"
              >Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? (new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                      <div className="author_list_pp bg-black opacity-25 p-2">
                        <div >
                          <img
                            className="lazy pp-author"
                         alt="" />
                          {/* <i className="fa fa-check"></i> */}
                        </div>
                      </div>
                      <div className="author_list_info">
                        <div>
                          
                        </div>
                        <span className="bg-black opacity-25 w-8 text-black">__</span>
                      </div>
                    </li>
                ))

                )
                : (topSellers.map((item, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  )))
                  }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
