/**
 * A8.net 広告（2つ目）
 * ユーザー提供の広告コード
 */
export default function NewA8Ad() {
  return (
    <div className="inline-block w-full max-w-[300px] mx-auto">
      <a
        href="https://px.a8.net/svt/ejp?a8mat=4AZBO0+B1PKVM+5N98+HX5B5"
        rel="nofollow"
        target="_blank"
        className="block rounded-2xl overflow-hidden shadow-lg hover:opacity-90 transition-opacity"
      >
        <img
          width={300}
          height={250}
          alt=""
          src="https://www21.a8.net/svt/bgt?aid=260308944668&wid=001&eno=01&mid=s00000026342003010000&mc=1"
          className="block"
        />
      </a>
      {/* インプレッション計測用ピクセル */}
      <img
        width={1}
        height={1}
        src="https://www18.a8.net/0.gif?a8mat=4AZBO0+B1PKVM+5N98+HX5B5"
        alt=""
        className="block"
      />
    </div>
  );
}
