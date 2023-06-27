import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
import { BsFillEmojiSmileFill, BsChatSquareHeart } from 'react-icons/bs';

const VideoConts = () => {
    const [videoDetail, setVideoDetail] = useState([null]);
    const { id } = useParams();
    useEffect(() => {
        fetch(
            'https://webstoryboy.github.io/site-youtube01/src/utils/subTest.json',
            // `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
        )
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setVideoDetail(result.items[0]);
            })
            .catch(error => console.log(error));
    }, [id]);
    if (!videoDetail?.snippet) return <Loader />;

    const {
        snippet: { title, channelId, channelTitle, description },
        statistics: { viewCount, likeCount },
    } = videoDetail;
    return (
        <section className="videoConts">
            <div className="container">
                <div className="video__box">
                    <div className="left">
                        <div className="play">
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${id}`}
                            />
                        </div>
                        <div className="desc">
                            <h3>{title}</h3>
                            <div className="channer">
                                <Link to={`/channel/${channelId}`}>
                                    {channelTitle}
                                </Link>
                                <div className="count">
                                    <span>
                                        <em>
                                            <BsFillEmojiSmileFill />
                                        </em>
                                        조회수 {viewCount}
                                    </span>
                                    <span>
                                        <em>
                                            <BsChatSquareHeart />
                                        </em>
                                        좋아요 {likeCount}
                                    </span>
                                </div>
                            </div>
                            <div className="description">
                                <span>{description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="right"></div>
                </div>
            </div>
        </section>
    );
};
export default VideoConts;
