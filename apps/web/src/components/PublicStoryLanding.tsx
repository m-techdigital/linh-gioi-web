"use client";

import { narrativeChapters } from "@lgo-web/content";
import { useEffect, useState } from "react";

const chapterArt = [
  "/game-art/story-target/chapter-1.png",
  "/game-art/story-target/chapter-2.png",
  "/game-art/story-target/chapter-3.png"
] as const;

function StoryHeroArt() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const sync = () => setMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return <div className="lgo-story-landing-art" aria-hidden="true">
    {!mobile ? <img className="lgo-story-hero-character" src="/game-art/story-target/hero-character.png" width={360} height={340} alt="" fetchPriority="high"/> : null}
    <img className="lgo-story-hero-gate" src="/game-art/story-target/hero-gate.png" width={560} height={450} alt="" fetchPriority="high"/>
  </div>;
}

export function PublicStoryLanding() {
  const invasion = narrativeChapters[2]!;
  return <div className="lgo-story-landing">
    <section className="lgo-story-landing-hero" aria-labelledby="story-landing-title">
      <StoryHeroArt/>
      <div className="lgo-story-landing-copy">
        <span className="lgo-story-eyebrow">CỐT TRUYỆN</span>
        <p className="lgo-story-kicker">HAI THẾ GIỚI TỪNG TỒN TẠI CẠNH NHAU</p>
        <h1 id="story-landing-title">Cho đến ngày những cánh cửa bắt đầu mở</h1>
        <p className="lgo-story-lead">Khi ranh giới giữa các thế giới bị xé toạc, Linh Giới không còn là một cõi bình yên. Và câu chuyện của bạn bắt đầu từ Đông Môn.</p>
        <div className="lgo-story-landing-actions">
          <a href="#chapters">Đọc từ Vết Nứt Đông Môn</a>
          <a href="/journey">Theo hành trình</a>
        </div>
      </div>
      <aside className="lgo-story-fracture-note" aria-label="Vết Nứt Đông Môn">
        <strong>Vết Nứt<br/>Đông Môn</strong>
        <span>Nơi những cánh cổng không thuộc về thế giới này bắt đầu mở.</span>
      </aside>
    </section>

    <section id="chapters" className="lgo-story-chapters" tabIndex={-1} aria-labelledby="story-chapters-title">
      <header className="lgo-story-chapters-heading">
        <div><span>MỞ ĐẦU TRUYỆN</span><h2 id="story-chapters-title">Những Cánh Cổng Không Thuộc Về</h2></div>
        <p>Từ Vết Nứt Đông Môn, bóng tối tràn qua. Một kỷ nguyên mới của Linh Giới bắt đầu.</p>
      </header>
      <div className="lgo-story-chapter-grid">
        {narrativeChapters.map((chapter,index)=><article className="lgo-story-chapter-card" aria-label={`${chapter.chapter}. ${chapter.title}. ${chapter.hook}`} key={chapter.chapter}>
          <img src={chapterArt[index]} alt="" loading="eager"/>
          <div><span>{chapter.chapter}</span><h3>{chapter.title}</h3><p>{chapter.hook}</p></div>
        </article>)}
        <article className="lgo-story-chapter-card lgo-story-event-card" aria-label={`Biến cố cốt truyện. Âm Giới Xâm Lăng. ${invasion.closingTurn}`}>
          <img src="/game-art/story-target/invasion.png" alt="" loading="eager"/>
          <div><span>BIẾN CỐ CỐT TRUYỆN</span><h3>Âm Giới Xâm Lăng</h3><p>{invasion.closingTurn}</p></div>
        </article>
      </div>
    </section>
  </div>;
}
