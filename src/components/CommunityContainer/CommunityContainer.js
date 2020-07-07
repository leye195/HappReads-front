import React from "react";
import classnames from "classnames/bind";
import style from "./CommunityContainer.scss";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import moment from "moment";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const cx = classnames.bind(style);
const CommunityContainer = ({
  path,
  isLoading,
  reviews,
  loadReviewsPending,
  loadReviewsDone,
  loadMore,
  toggleMore,
  more,
  handleLike,
}) => {
  const content = (path) => {
    if (path === "reviews") {
      return (
        <>
          {reviews.length === 0 && (
            <p style={{ textAlign: "center" }}>최근 리뷰가 없습니다.</p>
          )}
          {
            <>
              {reviews.length > 0 &&
                reviews.map((review) => {
                  return (
                    <section key={v4()} className={cx(["card", "row"])}>
                      <section className={cx("first-col")}>
                        <Link
                          to={`/book/${
                            review && review.book && review.book._id
                          }`}
                        >
                          <img
                            src={review && review.book && review.book.thumbnail}
                            alt={review && review.book && review.book.title}
                          />
                        </Link>
                        <p className={cx("like")}>
                          <FontAwesomeIcon
                            className={cx("heart")}
                            icon={faHeart}
                            onClick={handleLike(review)}
                          />{" "}
                          {review && review.likes && review.likes.length} 좋아요
                        </p>
                      </section>
                      <section className={cx("second-col")}>
                        <p className={cx("date")}>
                          {review &&
                            moment(review.createdAt).format(
                              "YYYY/MM/DD HH:MM:DD"
                            )}
                        </p>
                        <p className={cx("reviewer")}>
                          <Link
                            to={`/profile/${review && review.reviewer._id}`}
                          >
                            {review && review.reviewer.email.split("@")[0]}
                          </Link>
                        </p>
                        <h4 className={cx("title")}>
                          <Link
                            to={`/book/${
                              review && review.book && review.book._id
                            }`}
                          >
                            {review && review.book && review.book.title}
                          </Link>
                        </h4>
                        <section className={cx("content")}>
                          <img
                            src={
                              review &&
                              review.reviewer &&
                              review.reviewer.avatarUrl
                            }
                            alt={review && review.reviewer.email}
                          />
                          <article>
                            <p className={cx("content-text")}>
                              {more === false &&
                              review &&
                              review.content &&
                              review.content.length >= 50
                                ? `${review.content.substring(0, 50)}...`
                                : review.content}
                            </p>
                            {review &&
                            review.content &&
                            review.content.length >= 50 ? (
                              <p className={cx("more")} onClick={toggleMore}>
                                {more ? "줄이기" : "더보기"}
                              </p>
                            ) : null}
                          </article>
                        </section>
                      </section>
                    </section>
                  );
                })}
              {loadReviewsDone === false && (
                <button className={cx("load-more-btn")} onClick={loadMore}>
                  더 보기
                </button>
              )}
            </>
          }
        </>
      );
    }
  };
  return isLoading || loadReviewsPending ? (
    <Loading />
  ) : (
    <section className={cx("community-container")}>
      {path === "reviews" && (
        <section className={cx("reviews")}>{content("reviews")}</section>
      )}
    </section>
  );
};
export default CommunityContainer;
