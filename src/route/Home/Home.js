import React, { useState, useEffect, useCallback } from "react";
import HomeSection from "../../components/HomeSection";
import HomeContent from "../../components/HomeContent";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBooks,
  getSliderBooks,
  getRecentBooks,
  getPopularBooks,
} from "../../reducer/books";
import Loading from "../../components/Loading";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState("전체");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    allBookDone,
    allBookPending,
    sliderPending,
    recentPending,
    popularPending,
    books,
    sliderBooks,
    recentBooks,
    popularBooks,
  } = useSelector((state) => state.books);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllBooks("전체", 1));
    dispatch(getSliderBooks());
    dispatch(getRecentBooks());
    dispatch(getPopularBooks());
    setIsLoading(false);
  }, [dispatch]);
  const handleClick = useCallback(
    (e) => {
      const {
        target: { dataset },
      } = e;
      setType(dataset.value);
    },
    [setType]
  );
  const handleMore = useCallback(() => {
    if (!allBookDone) {
      dispatch(getAllBooks("전체", page + 1));
      setPage(page + 1);
    }
  }, [dispatch, page, allBookDone]);
  return (
    <main>
      {isLoading ||
      allBookPending ||
      sliderPending ||
      recentPending ||
      popularPending ? (
        <Loading />
      ) : (
        <>
          <HomeSection />
          <HomeContent
            booklist={books}
            sliderBooks={sliderBooks}
            recentBooks={recentBooks}
            popularBooks={popularBooks}
            handleClick={handleClick}
            handleMore={handleMore}
            done={allBookDone}
            type={type}
            page={page}
          />
        </>
      )}
    </main>
  );
};
export default Home;