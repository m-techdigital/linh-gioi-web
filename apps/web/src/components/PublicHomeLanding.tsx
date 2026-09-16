import { localContentRepository } from "@lgo-web/content";
import { ArtWordmark, EditorialPreviewCard, ExperienceHero, IllustratedLink, MediaMosaic, ReleaseIcon } from "@lgo-web/ui";

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
const newsArt = [art("news-event",242,91),art("news-update",244,91),art("news-community",244,91)] as const;

export function PublicHomeLanding() {
  const news = localContentRepository.list("news").slice(0,3);
  return <div className="lgo-immersive-landing">
    <ExperienceHero className="lgo-immersive-hero" copyClassName="lgo-immersive-copy"
      title={<ArtWordmark src="/game-art/marketing/wordmark-brush.png" width={422} height={169} label="Linh Giới Online" fallback={<><span>Linh Giới</span><small>ONLINE</small></>}/>}
      kicker="Sống một đời khác trong Linh Giới"
      badge="MMORPG hành động cộng đồng 2D"
      lead="Gặp gỡ ở Linh Thành. Chọn Lộ của bạn. Viết tiếp câu chuyện của riêng mình."
      actions={[
        {href:"/game",label:"Khám phá Linh Giới",tone:"spirit",variant:"ornate",icon:<ReleaseIcon name="compass"/>,description:"Thế giới và nhân vật"},
        {href:"/classes",label:"Chọn Lộ của bạn",tone:"jade",variant:"ornate",icon:<ReleaseIcon name="lotus"/>,description:"Tìm con đường riêng"},
        {href:"/story",label:"Bắt đầu câu chuyện",tone:"gold",variant:"ornate",icon:<ReleaseIcon name="book"/>,description:"Đọc mở đầu hành trình"}
      ]}
      detail={<div className="lgo-landing-signals" aria-label="Định hướng thế giới"><span>Thế giới 2D</span><span>Năm Lộ nhân vật</span><span>Kết nối cộng đồng</span><span>Cùng nhau viết chuyện</span></div>}
      visual={<div className="lgo-immersive-art" aria-hidden="true"><picture className="lgo-native-hero-scene"><source media="(max-width: 600px)" srcSet="/game-art/marketing/hero-mobile.png" width={565} height={405}/><img {...art("hero-artwork",1672,405)} alt="" fetchPriority="high"/></picture></div>}/>
    <div className="lgo-landing-content">
      <section className="lgo-landing-features" aria-label="Ba nét riêng của Linh Giới">{featureLinks.map(item=><IllustratedLink {...item} key={item.href}/>)}</section>
      <div className="lgo-landing-columns">
        <section id="home-discovery" aria-labelledby="home-discovery-heading">
          <div className="lgo-landing-heading"><h2 id="home-discovery-heading"><ReleaseIcon name="shield"/>Khám phá Linh Giới</h2><a href="/game">Xem thêm <span aria-hidden="true">→</span></a></div>
          <MediaMosaic lead={{href:"/game",title:"Một thế giới để thuộc về",description:"Khám phá Linh Thành và những vùng đất đang chờ được kể",image:art("discovery-world",500,300)}} items={discoveries}/>
          <p className="lgo-landing-art-note">Minh họa định hướng thế giới, không phải trailer hoặc ảnh gameplay.</p>
        </section>
        <section id="home-news" aria-labelledby="home-news-heading">
          <div className="lgo-landing-heading"><h2 id="home-news-heading"><ReleaseIcon name="document"/>Bản tin Linh Giới</h2><a href="/news">Xem tất cả <span aria-hidden="true">→</span></a></div>
          <div className="lgo-landing-news-grid">{news.map((entry,index)=><EditorialPreviewCard key={entry.slug}
            title={entry.title} href={`/news/${entry.slug}`} dateTime={entry.publishedAt} dateLabel={date.format(new Date(entry.publishedAt))}
            category="Nhật ký web" summary={entry.summary} image={newsArt[index]!}/>)}</div>
        </section>
      </div>
    </div>
  </div>;
}
