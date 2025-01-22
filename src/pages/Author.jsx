import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";

const Author = () => {
  const [author, setAuthor] = useState([]);

  const [isFollowing, setIsFollowing] = useState(false);

  function FollowToggle() {
    setIsFollowing((prevState) => !prevState);
  }

  const [loading, setLoading] = useState(true);

  const { authorId } = useParams();

  async function fetchAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthor(data);
  }

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  useEffect(() => {
    fetchAuthor();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        {loading ? (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar bg-black opacity-25">
                        <img alt="" />

                        <div className="profile_name bg-black opacity-25 text-black">
                          <h4>
                            author name
                            <span className="profile_username bg-black opacity-25">
                              @12345678
                            </span>
                            <span
                              id="wallet"
                              className="profile_wallet bg-black opacity-25 text-black"
                            >
                              addresslengthisxcharacters
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower bg-black opacity-25 text-black ml-2">
                          {" "}
                          000 followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main bg-black opacity-25 text-black no-cursor"
                        >
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {isFollowing
                            ? author.followers + 1
                            : author.followers}{" "}
                          followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={FollowToggle}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems
                      nftCollection={author.nftCollection}
                      authorImage={author.authorImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Author;
