"use client";

import { classPaths } from "@lgo-web/content";
import { useMemo, useState } from "react";

const portraitById: Record<string,string> = {
  vo: "/game-art/classes-target/vo.png",
  kiem: "/game-art/classes-target/kiem.png",
  phap: "/game-art/classes-target/phap.png",
  co: "/game-art/classes-target/co.png",
  linh: "/game-art/classes-target/linh.png"
};

export function PublicClassesLanding() {
  const [selectedId,setSelectedId] = useState(classPaths[0]!.id);
  const selected = useMemo(() => classPaths.find((path)=>path.id===selectedId) ?? classPaths[0]!,[selectedId]);
  const selectedArt = selected.id === "vo" ? "/game-art/classes-target/vo-feature.png" : portraitById[selected.id];
  return <div className="lgo-classes-landing">
    <section className="lgo-classes-landing-hero" aria-labelledby="classes-title">
      <picture aria-hidden="true"><img className="lgo-classes-hero-city" src="/game-art/world-target/hero-city.png" alt=""/></picture>
      <div className="lgo-classes-hero-copy">
        <span className="lgo-classes-eyebrow">NĂM LỘ</span>
        <h1 id="classes-title">Chọn cách bạn bảo vệ Linh Giới</h1>
        <p>Năm con đường. Một thế giới. Mỗi lựa chọn là một niềm tin, một sức mạnh và một cách gìn giữ những điều quý giá.</p>
      </div>      <div className="lgo-five-path-wheel" aria-label="Năm Lộ">
        <strong>Năm<br/>Lộ</strong>
        {classPaths.map((path)=><span className={`lgo-wheel-${path.id}`} key={path.id}>{path.name}</span>)}
      </div>
    </section>

    <section className="lgo-class-choice-section" aria-labelledby="classes-choice-title">
      <header><div><span>CHỌN LỘ</span><h2 id="classes-choice-title">Năm cách bước vào chiến trường</h2></div></header>
      <div className="lgo-class-choice-grid">
        {classPaths.map((path)=><article className={`lgo-class-choice-card lgo-choice-${path.id}`} key={path.id}>
          <button type="button" aria-pressed={selected.id===path.id} onClick={()=>setSelectedId(path.id)}>
            <img src={portraitById[path.id]} alt=""/>
            <span>{path.role}</span>
            <h3>{path.name}</h3>
            <p>{path.fantasy}</p>
          </button>
        </article>)}
      </div>
    </section>

    <section className="lgo-class-selected-feature" aria-live="polite">
      <img src={selectedArt} alt=""/>
      <div><span>LỘ ĐANG XEM</span><h2>{selected.name} — {selected.role}</h2>        <p>{selected.battleRhythm}</p>
        <div className="lgo-selected-verbs" aria-label={`Nhịp nhận diện ${selected.name}`}>
          {selected.signatureVerbs.map((verb)=><span key={verb}>{verb}</span>)}
        </div>
        <p className="lgo-selected-world-lens">{selected.worldLens}</p>
      </div>
    </section>
  </div>;
}
