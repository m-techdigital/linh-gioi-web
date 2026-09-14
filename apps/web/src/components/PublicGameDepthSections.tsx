import { classPaths, narrativeChapters, worldRouteStops } from "@lgo-web/content";
import { SectionHeading } from "@lgo-web/ui";
import { getWorldRouteKindLabel } from "./worldRouteLabels";

export function ClassIdentityDeck() {
  return (
    <section className="lgo-experience-section lgo-class-identity-section" aria-labelledby="class-identity-heading">
      <SectionHeading eyebrow="Bản sắc Năm Lộ" title="Năm Lộ — năm cách đọc cùng một thế giới">
        Chọn Lộ không chỉ đổi bộ kỹ năng. Nó đổi nhịp bạn bước vào trận, điều bạn chú ý trong câu chuyện và cách đồng đội cảm nhận sự hiện diện của bạn.
      </SectionHeading>
      <div className="lgo-class-identity-deck" id="class-identity-heading">
        {classPaths.map((path, index) => (
          <article className={`lgo-class-identity-card lgo-class-${path.id}`} key={path.id}>
            <header>
              <span className="lgo-class-identity-number">0{index + 1}</span>
              <div className="lgo-class-identity-mark" aria-hidden="true"><i /><b>{path.name}</b><i /></div>
              <div>
                <span className="lgo-card-kicker">{path.role}</span>
                <h3>{path.name}</h3>
              </div>
            </header>
            <p className="lgo-class-identity-fantasy">{path.fantasy}</p>
            <dl>
              <div><dt>Nhịp chiến đấu</dt><dd>{path.battleRhythm}</dd></div>
              <div><dt>Cách nhìn thế giới</dt><dd>{path.worldLens}</dd></div>
              <div><dt>Vai trò trong tổ đội</dt><dd>{path.teamFantasy}</dd></div>
            </dl>
            <div className="lgo-class-signature-verbs" aria-label={`Động từ nhận diện của ${path.name}`}>
              {path.signatureVerbs.map((verb) => <span key={verb}>{verb}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WorldAtlasStories() {
  return (
    <section className="lgo-experience-section lgo-world-atlas-section" aria-labelledby="world-atlas-heading">
      <SectionHeading eyebrow="Bản đồ thế giới" title="Mỗi nơi trong Linh Giới phải cho bạn một cảm giác khác">
        Tuyến mở đầu không chỉ tăng độ khó. Nó dịch chuyển từ cảm giác thuộc về, sang tò mò, bất an, khám phá lịch sử rồi cuối cùng là một hiểm họa đủ lớn để kéo cả cộng đồng vào cuộc.
      </SectionHeading>
      <div className="lgo-world-atlas-stories" id="world-atlas-heading">
        {worldRouteStops.map((stop, index) => (
          <article className={`lgo-world-atlas-card lgo-world-atlas-${stop.kind}`} key={stop.name}>
            <div className="lgo-world-atlas-visual" aria-hidden="true">
              <span>{stop.order}</span><i /><i /><b />
            </div>
            <div className="lgo-world-atlas-copy">
              <header>
                <span className="lgo-card-kicker">{getWorldRouteKindLabel(stop.kind)}</span>
                <h3>{stop.name}</h3>
                <small>{index === 0 ? "Nơi để trở về" : index === worldRouteStops.length - 1 ? "Nơi hai thế giới va vào nhau" : "Một bước xa hơn khỏi vùng an toàn"}</small>
              </header>
              <p className="lgo-world-atlas-mood">{stop.mood}</p>
              <div className="lgo-world-atlas-facts">
                <div><strong>Lời hứa với người chơi</strong><span>{stop.playerPromise}</span></div>
                <div><strong>Nhịp hoạt động</strong><span>{stop.signatureActivity}</span></div>
                <div><strong>Áp lực cốt truyện</strong><span>{stop.narrativePressure}</span></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StoryArcTimeline() {
  return (
    <section className="lgo-experience-section lgo-story-arc-section" aria-labelledby="story-arc-heading">
      <SectionHeading eyebrow="Mở đầu truyện" title="Ba chương — một thế giới mất dần cảm giác an toàn">
        Mỗi chương phải thay đổi quy mô câu hỏi: từ một khe nứt ngoài thành, tới một mạng lưới portal, rồi thành cuộc xâm lăng khiến nơi người chơi gọi là nhà cũng bị đặt lên bàn cân.
      </SectionHeading>
      <div className="lgo-story-arc-timeline" id="story-arc-heading">
        {narrativeChapters.map((chapter, index) => (
          <article className="lgo-story-arc-entry" key={chapter.chapter}>
            <div className="lgo-story-arc-spine" aria-hidden="true">
              <span>0{index + 1}</span>
              {index < narrativeChapters.length - 1 ? <i /> : null}
            </div>
            <div className="lgo-story-arc-card">
              <header>
                <span className="lgo-card-kicker">{chapter.chapter}</span>
                <h3>{chapter.title}</h3>
              </header>
              <blockquote>{chapter.openingImage}</blockquote>
              <div className="lgo-story-arc-grid">
                <div><strong>Điều đang bị đe dọa</strong><p>{chapter.stakes}</p></div>
                <div><strong>Vai trò của bạn</strong><p>{chapter.playerRole}</p></div>
              </div>
              <footer>
                <span>Chuyển biến cuối chương</span>
                <p>{chapter.closingTurn}</p>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
