import Image from "next/image";
import {
  classPaths,
  gameExperiencePillars,
  narrativeChapters,
  publicGameArtAssets,
  sampleSessionBeats,
  worldRouteStops
} from "@lgo-web/content";
import { GameCard, Grid, LinkButton, SectionHeading, StatusBadge } from "@lgo-web/ui";

const worldConceptArt = publicGameArtAssets.find((asset) => asset.id === "dong-mon-world-concept")!;
const voStarterArt = publicGameArtAssets.find((asset) => asset.id === "vo-lv1-starter-development-art")!;
const voSkillArt = publicGameArtAssets.find((asset) => asset.id === "vo-lv1-skill-development-art")!;

export function SpiritRouteBreadcrumb() {
  return (
    <div className="lgo-spirit-route-breadcrumb" aria-label="Tuyến mở đầu Linh Giới">
      <span>Linh Thành</span><i aria-hidden="true" />
      <span>Đông Môn</span><i aria-hidden="true" />
      <span>Linh Lâm</span><i aria-hidden="true" />
      <span>Cổ Di Tích</span><i aria-hidden="true" />
      <span>Âm Giới</span>
    </div>
  );
}

export function CinematicWorldScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`lgo-cinematic-scene${compact ? " lgo-cinematic-scene-compact" : ""}`} aria-label="Minh họa Linh Thành và khe nứt Âm Giới">
      <div className="lgo-world-concept-art" aria-hidden="true">
        <Image
          src={worldConceptArt.webPath}
          alt=""
          width={1360}
          height={765}
          priority={!compact}
          sizes={compact ? "(max-width: 900px) 100vw, 680px" : "(max-width: 900px) 100vw, 58vw"}
        />
      </div>
      <span className="lgo-art-status-chip lgo-world-concept-chip">World concept · Đông Môn</span>
      <div className="lgo-hero-atmosphere" aria-hidden="true"><i /><i /><i /></div>
      <div className="lgo-scene-sky" aria-hidden="true" />
      <div className="lgo-scene-moon" aria-hidden="true" />
      <div className="lgo-scene-rift" aria-hidden="true"><i /><i /><i /></div>
      <div className="lgo-scene-mountain lgo-scene-mountain-far" aria-hidden="true" />
      <div className="lgo-scene-mountain lgo-scene-mountain-near" aria-hidden="true" />
      <div className="lgo-scene-city lgo-scene-city-far" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="lgo-scene-city lgo-scene-city-near" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="lgo-scene-gate" aria-hidden="true"><span /><span /></div>
      <div className="lgo-scene-lanterns" aria-hidden="true"><i /><i /><i /></div>
      <div className="lgo-scene-spirit-trails" aria-hidden="true"><i /><i /><i /></div>
      <div className="lgo-scene-caption">
        <span>LINH THÀNH · ĐÔNG MÔN</span>
        <strong>“Cho đến ngày những cánh cửa bắt đầu mở.”</strong>
      </div>
    </div>
  );
}

export function GamePillarGrid() {
  return (
    <section className="lgo-experience-section" aria-labelledby="experience-pillars-heading">
      <SectionHeading eyebrow="Ba trụ cột" title="Không chỉ đánh quái — hãy sống trong thế giới này">
        Linh Giới kết hợp đời sống xã hội, action side-scrolling và một hành trình phát triển nhân vật kéo dài qua nhiều vùng đất.
      </SectionHeading>
      <Grid className="lgo-experience-pillar-grid" id="experience-pillars-heading">
        {gameExperiencePillars.map((pillar, index) => (
          <GameCard className={`lgo-experience-pillar lgo-pillar-${pillar.id}`} key={pillar.id}>
            <div className="lgo-pillar-visual" aria-hidden="true"><span /><i /><b /></div>
            <span className="lgo-card-index">0{index + 1}</span>
            <span className="lgo-card-kicker">{pillar.tagline}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.summary}</p>
          </GameCard>
        ))}
      </Grid>
    </section>
  );
}

export function ClassPathGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="lgo-experience-section" aria-labelledby="class-paths-heading">
      <div className="lgo-section-heading-row">
        <SectionHeading eyebrow="Năm Lộ" title="Chọn cách bạn bước vào chiến trường">
          Cùng một thế giới, nhưng mỗi Lộ đọc hiểm họa, nhịp chiến đấu và vai trò trong cộng đồng theo một cách khác.
        </SectionHeading>
        {compact ? <LinkButton href="/classes" tone="gold">Khám phá đủ 5 Lộ</LinkButton> : null}
      </div>
      <div className={`lgo-class-path-grid${compact ? " lgo-class-path-grid-compact" : ""}`} id="class-paths-heading">
        {classPaths.map((path) => (
          <article className={`lgo-class-path lgo-class-${path.id}`} key={path.id}>
            <div className="lgo-class-emblem" aria-hidden="true">
              <span className="lgo-class-emblem-ring" />
              <span className="lgo-class-emblem-core">{path.name}</span>
              <i /><i /><i />
            </div>
            <div className="lgo-class-copy">
              <span className="lgo-card-kicker">{path.role}</span>
              <h3>{path.name}</h3>
              <p className="lgo-class-fantasy">{path.fantasy}</p>
              {!compact ? <p>{path.combatIdentity}</p> : null}
              <small>{path.visualSignal}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ClassArtSpotlight() {
  return (
    <section className="lgo-class-art-spotlight" aria-labelledby="vo-development-art-heading">
      <div className="lgo-class-art-spotlight-copy">
        <span className="lgo-card-kicker">Development art preview · Võ</span>
        <h2 id="vo-development-art-heading">Một Lộ được mở như một bộ nhận diện — không phải một tấm poster duy nhất</h2>
        <p>
          Võ cho thấy cách Linh Giới xây class bằng nhiều lớp có thể thay đổi: gương mặt, trang bị rời, đai, giày, vũ khí và VFX. Website dùng board này như một lát cắt art direction để kể về tính modular của nhân vật, không xem đây là key art production-final.
        </p>
        <div className="lgo-class-art-note">
          <strong>{voStarterArt.publicLabel}</strong>
          <span>{voStarterArt.notFinalArt}</span>
        </div>
        <div className="lgo-class-parity-strip" aria-label="Năm Lộ tiếp tục có vị trí ngang hàng">
          {classPaths.map((path) => <span key={path.id}>{path.name}</span>)}
        </div>
      </div>

      <div className="lgo-class-art-spotlight-visual">
        <figure className="lgo-class-art-board lgo-class-art-board-starter">
          <div className="lgo-class-art-frame">
            <Image
              src={voStarterArt.webPath}
              alt="Bảng thiết kế modular của class Võ gồm gương mặt, trang phục, phụ kiện và vũ khí"
              width={1280}
              height={1280}
              sizes="(max-width: 720px) 92vw, 620px"
            />
          </div>
          <figcaption>Modular gear board · Võ</figcaption>
        </figure>
        <figure className="lgo-class-art-board lgo-class-art-board-skill">
          <div className="lgo-class-art-frame">
            <Image
              src={voSkillArt.webPath}
              alt="Bảng hiệu ứng kỹ năng đang phát triển cho class Võ"
              width={820}
              height={820}
              sizes="(max-width: 720px) 50vw, 260px"
              loading="lazy"
            />
          </div>
          <figcaption>{voSkillArt.publicLabel}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function WorldPanoramaBand() {
  return (
    <section className="lgo-world-panorama" aria-labelledby="world-panorama-heading">
      <div className="lgo-world-panorama-copy">
        <span className="lgo-card-kicker">Một thế giới để rời đi — và để trở về</span>
        <h2 id="world-panorama-heading">Từ ánh đèn Linh Thành đến bóng tối bên kia cánh cổng</h2>
        <p>
          Mỗi vùng là một nhịp khác nhau của cùng một hành trình: social hub, cửa ngõ nhập môn, vùng săn ngoài thành, di tích cổ và cuối cùng là nơi Âm Giới chạm tới thế giới con người.
        </p>
        <div className="lgo-hero-actions">
          <LinkButton href="/game" tone="spirit">Khám phá Linh Giới</LinkButton>
          <LinkButton href="/journey" tone="jade">Theo một phiên chơi</LinkButton>
        </div>
      </div>
      <div className="lgo-world-panorama-art" aria-hidden="true">
        <div className="lgo-panorama-sky" />
        <div className="lgo-panorama-city" />
        <div className="lgo-panorama-forest" />
        <div className="lgo-panorama-ruins" />
        <div className="lgo-panorama-realm" />
        <div className="lgo-panorama-route">
          {worldRouteStops.map((stop) => <span key={stop.name}>{stop.name}</span>)}
        </div>
      </div>
    </section>
  );
}

export function WorldRouteJourney() {
  return (
    <section className="lgo-experience-section lgo-world-route-section" aria-labelledby="world-route-heading">
      <SectionHeading eyebrow="Hành trình thế giới" title="Rời thành phố. Tìm dấu vết. Đi tới nơi cánh cổng mở ra.">
        Linh Thành là nơi bạn thuộc về; những vùng ngoài thành là nơi câu chuyện bắt đầu biến đổi thế giới quanh bạn.
      </SectionHeading>
      <div className="lgo-world-route" id="world-route-heading">
        {worldRouteStops.map((stop, index) => (
          <article className={`lgo-world-route-stop lgo-world-${stop.kind}`} key={stop.name}>
            <div className="lgo-route-marker">
              <span>{stop.order}</span>
              {index < worldRouteStops.length - 1 ? <i aria-hidden="true" /> : null}
            </div>
            <div>
              <span className="lgo-card-kicker">{stop.kind}</span>
              <h3>{stop.name}</h3>
              <p>{stop.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function NarrativeChapterGrid() {
  return (
    <section className="lgo-experience-section" aria-labelledby="narrative-chapters-heading">
      <SectionHeading eyebrow="Cốt truyện mở đầu" title="Những vết nứt đầu tiên chỉ là khởi đầu">
        Ba chương đầu đưa Người Thức Tỉnh từ một bất thường ngoài Đông Môn tới cuộc xâm lăng buộc cả Linh Thành phải cùng đứng lên.
      </SectionHeading>
      <div className="lgo-narrative-chapters" id="narrative-chapters-heading">
        {narrativeChapters.map((chapter, index) => (
          <article className="lgo-narrative-chapter" key={chapter.chapter}>
            <div className="lgo-chapter-visual" aria-hidden="true"><span>0{index + 1}</span><i /><b /></div>
            <span className="lgo-card-kicker">{chapter.chapter}</span>
            <h3>{chapter.title}</h3>
            <p>{chapter.hook}</p>
            <div className="lgo-chapter-role"><strong>Vai trò của bạn</strong><span>{chapter.playerRole}</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SessionLoopRail() {
  return (
    <section className="lgo-experience-section" aria-labelledby="session-loop-heading">
      <SectionHeading eyebrow="Một phiên chơi mẫu" title="20 phút: từ Linh Thành, ra chiến trường rồi trở về">
        Nhịp chơi được thiết kế để action luôn quay lại phục vụ progression, cộng đồng và danh tính của nhân vật — không biến game thành một chuỗi trận đánh rời rạc.
      </SectionHeading>
      <div className="lgo-session-loop" id="session-loop-heading">
        {sampleSessionBeats.map((beat) => (
          <article className="lgo-session-beat" key={beat.time}>
            <span>{beat.time}</span>
            <h3>{beat.title}</h3>
            <p>{beat.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ShadowInvasionFeature() {
  return (
    <section className="lgo-shadow-invasion" aria-labelledby="shadow-invasion-heading">
      <div className="lgo-shadow-invasion-art" aria-hidden="true">
        <div className="lgo-invasion-portal"><i /><i /><i /></div>
        <div className="lgo-invasion-ground" />
        <div className="lgo-invasion-sentinels"><i /><i /><i /></div>
      </div>
      <div className="lgo-shadow-invasion-copy">
        <StatusBadge tone="shadow">Signature world event</StatusBadge>
        <span className="lgo-card-kicker">Âm Giới Xâm Lăng</span>
        <h2 id="shadow-invasion-heading">Khi thành phố bạn gọi là nhà trở thành nơi phải bảo vệ</h2>
        <p>
          Portal xuất hiện ở nhiều zone. Người chơi hợp lực qua các khu vực, chống từng đợt xâm lăng và đối mặt World Boss. Đóng góp dài hạn được thiết kế cho nhiều vai trò, không chỉ raw DPS.
        </p>
        <div className="lgo-hero-actions">
          <LinkButton href="/story" tone="shadow">Bắt đầu câu chuyện</LinkButton>
          <LinkButton href="/events" tone="gold">Theo dõi sự kiện</LinkButton>
        </div>
      </div>
    </section>
  );
}

export function AvailabilityNote() {
  return (
    <aside className="lgo-availability-note" aria-label="Trạng thái phát hành">
      <div>
        <span className="lgo-card-kicker">Development status</span>
        <strong>Thế giới và fantasy là định hướng sản phẩm; bản public chưa được mở.</strong>
        <p>Download/Status giữ thông tin phát hành hiện tại để tránh biến thiết kế tương lai thành lời hứa đã playable.</p>
      </div>
      <LinkButton href="/download" tone="jade">Xem trạng thái chơi</LinkButton>
    </aside>
  );
}
