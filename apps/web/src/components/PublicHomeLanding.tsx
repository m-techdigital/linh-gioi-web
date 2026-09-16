import { localContentRepository } from "@lgo-web/content";
import { ArtWordmark, ExperienceHero, IllustratedLink, LinkButton, MediaMosaic, ReleaseIcon } from "@lgo-web/ui";

const art = (id: string, width: number, height: number) => ({ src: `/game-art/marketing/${id}.png`, width, height });
const featureLinks = [
  { href: "/game", title: "Thế giới sống động", description: "Từ ánh đèn Linh Thành đến những cánh cổng bí ẩn.", image: art("feature-world",463,84) },
  { href: "/game/loop", title: "Chiến đấu hành động", description: "Khám phá nhịp luyện tập và định hướng lối chơi 2D.", image: art("feature-action",462,84) },
  { href: "/community", title: "Kết nối muôn phương", description: "Gặp gỡ, đồng hành và cùng viết nên câu chuyện.", image: art("feature-community",461,84) }
];
const discoveries = [
  { href: "/story", title: "Cốt truyện", image: art("gallery-purple",129,64) },
  { href: "/classes", title: "Năm Lộ", image: art("gallery-jade",124,64) },
  { href: "/journey", title: "Hành trình", image: art("gallery-sunset",129,62) },
  { href: "/community", title: "Cộng đồng", image: art("gallery-snow",124,62) }
];
const date = new Intl.DateTimeFormat("vi-VN", { day:"2-digit",month:"2-digit",year:"numeric",timeZone:"UTC" });

export function PublicHomeLanding() {
  const news = localContentRepository.list("news").slice(0,3);
  return <div className="lgo-immersive-landing">
    <ExperienceHero className="lgo-immersive-hero" copyClassName="lgo-immersive-copy"
      title={<ArtWordmark src="/game-art/marketing/wordmark-brush.png" width={422} height={169} label="Linh Giới Online" fallback={<><span>Linh Giới</span><small>ONLINE</small></>}/>}
      kicker="Sống một đời khác trong Linh Giới"
      badge="MMORPG hành động cộng đồng 2D"
      lead="Gặp gỡ ở Linh Thành. Chọn Lộ của bạn. Viết tiếp câu chuyện của riêng mình."
      actions={[{href:"/game",label:"Khám phá Linh Giới",tone:"spirit"},{href:"/classes",label:"Chọn Lộ của bạn",tone:"jade"},{href:"/story",label:"Bắt đầu câu chuyện",tone:"gold"}]}
      detail={<div className="lgo-landing-signals" aria-label="Định hướng thế giới"><span>Thế giới 2D</span><span>Năm Lộ nhân vật</span><span>Kết nối cộng đồng</span><span>Cùng nhau viết chuyện</span></div>}
      visual={<div className="lgo-immersive-art" aria-hidden="true"><picture className="lgo-native-hero-scene"><source media="(max-width: 600px)" srcSet="/game-art/marketing/hero-mobile.png" width={565} height={405}/><img {...art("hero-artwork",1672,405)} alt="" fetchPriority="high"/></picture></div>}/>
    <div className="lgo-landing-content">
      <section className="lgo-landing-features" aria-label="Ba nét riêng của Linh Giới">{featureLinks.map(item=><IllustratedLink {...item} key={item.href}/>)}</section>
      <div className="lgo-landing-columns">
        <section id="home-discovery" aria-labelledby="home-discovery-heading">
          <div className="lgo-landing-heading"><h2 id="home-discovery-heading"><ReleaseIcon name="shield"/>Khám phá Linh Giới</h2><a href="/game">Xem thêm <span aria-hidden="true">→</span></a></div>
          <MediaMosaic lead={{href:"/game",title:"Một thế giới để thuộc về",description:"Khám phá những vùng đất",image:{src:"/game-art/world/dong-mon-skyline.webp",width:1360,height:765}}} items={discoveries}/>
          <p className="lgo-landing-art-note">Minh họa định hướng thế giới, không phải trailer hoặc ảnh gameplay.</p>
        </section>
        <section id="home-news" aria-labelledby="home-news-heading">
          <div className="lgo-landing-heading"><h2 id="home-news-heading"><ReleaseIcon name="document"/>Bản tin Linh Giới</h2><a href="/news">Xem tất cả <span aria-hidden="true">→</span></a></div>
          <div className="lgo-landing-news-grid">{news.map((entry,index)=><article className="lgo-landing-news-card" key={entry.slug}>
            <img {...featureLinks[index % featureLinks.length]!.image} alt="" loading="lazy"/>
            <div className="lgo-landing-news-copy"><div className="lgo-landing-news-meta"><span>Nhật ký web</span><time dateTime={entry.publishedAt}>{date.format(new Date(entry.publishedAt))}</time></div>
              <h3><a href={`/news/${entry.slug}`}>{entry.title}</a></h3><details><summary>Đọc tóm tắt</summary><p>{entry.summary}</p></details>
            </div>
          </article>)}</div>
        </section>
      </div>
      <aside className="lgo-landing-availability" aria-label="Trạng thái phát hành"><div><strong>Bản public chưa mở</strong><p>Khám phá thế giới hôm nay. Theo dõi điều kiện mở chơi tại trang trạng thái.</p></div><LinkButton href="/download" tone="gold">Xem trạng thái chơi</LinkButton></aside>
    </div>
  </div>;
}
