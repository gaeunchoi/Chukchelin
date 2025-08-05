export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Pretendard 폰트 테스트
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">
            폰트 굵기 테스트
          </h2>
          <div className="space-y-2">
            <p className="font-thin">
              Thin (100) - 가나다라마바사아자차카타파하
            </p>
            <p className="font-light">
              Light (300) - 가나다라마바사아자차카타파하
            </p>
            <p className="font-normal">
              Regular (400) - 가나다라마바사아자차카타파하
            </p>
            <p className="font-medium">
              Medium (500) - 가나다라마바사아자차카타파하
            </p>
            <p className="font-semibold">
              SemiBold (600) - 가나다라마바사아자차카타파하
            </p>
            <p className="font-bold">
              Bold (700) - 가나다라마바사아자차카타파하
            </p>
            <p className="font-extrabold">
              ExtraBold (800) - 가나다라마바사아자차카타파하
            </p>
            <p className="font-black">
              Black (900) - 가나다라마바사아자차카타파하
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            영어 텍스트 테스트
          </h2>
          <div className="space-y-2">
            <p className="font-light">
              Light - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-normal">
              Regular - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-medium">
              Medium - The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-bold">
              Bold - The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            혼합 텍스트 테스트
          </h2>
          <div className="space-y-2">
            <p className="font-normal">
              한국어와 English가 섞인 텍스트입니다. Pretendard 폰트가
              제대로 적용되었는지 확인해보세요.
            </p>
            <p className="font-medium">
              축구 경기장 근처 맛집을 찾아보세요! Find the best
              restaurants near football stadiums!
            </p>
            <p className="font-bold">
              K리그 구장 인근 맛집을 확인해보세요. Check out
              restaurants near K-League stadiums.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">폰트 정보</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-normal">
              <strong>현재 적용된 폰트:</strong> Pretendard (CDN 방식)
            </p>
            <p className="font-normal">
              <strong>폰트 패밀리:</strong> &apos;Pretendard&apos;,
              -apple-system, BlinkMacSystemFont, system-ui, Roboto,
              &apos;Helvetica Neue&apos;, &apos;Segoe UI&apos;,
              &apos;Apple SD Gothic Neo&apos;, &apos;Noto Sans
              KR&apos;, &apos;Malgun Gothic&apos;, sans-serif
            </p>
            <p className="font-normal">
              <strong>CDN 링크:</strong>{' '}
              https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
