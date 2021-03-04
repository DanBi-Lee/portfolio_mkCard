import { fetchImg } from "./api";

class SearchImage {
  constructor(selector) {
    this.$searchForm = document.querySelector(selector);
    this.$contentsBox = document.querySelector(".contents_imgbox");

    this.init();
  }

  index = 1;

  init = () => {
    this.onSearch();
  };

  observer = new IntersectionObserver(
    (entries) => this.handlingIntersect(entries),
    {
      root: this.$contentsBox,
      rootMargins: "0px",
      threshold: 0.5,
    }
  );

  handlingIntersect = (entries) => {
    if (entries[0].isIntersecting) {
      if (this.index >= this.maxIndex) {
        this.observer.disconnect();
        return;
      }
      this.index++;
      this.$sentinel.remove();
      this.observer.disconnect();
      this.getImage();
    }
  };

  onSearch = () => {
    this.$searchForm.addEventListener("submit", this.handlingSearch);
  };

  handlingSearch = (e) => {
    e.preventDefault();
    this.index = 1;
    this.$contentsBox.scrollTop = 0;
    this.keyword = e.target.querySelector("#searchImg").value;
    this.getImage();
  };

  getImage = async () => {
    const data = await fetchImg(this.keyword, this.index);
    this.maxIndex = data.total / 36;
    const resultImage = data.hits;
    this.render(resultImage);
  };

  render = (data) => {
    if (!data) {
      return;
    }
    if (data.length === 0 && this.index === 1) {
      this.$contentsBox.innerHTML = `
            <p>
                ${this.keyword}에 대한 검색 결과가 없습니다.
            </p>
        `;
    } else {
      if (this.index === 1) {
        this.$contentsBox.innerHTML = "";
        this.$ul = document.createElement("ul");
        this.$ul.setAttribute("class", "result_bg");
        this.$contentsBox.appendChild(this.$ul);
      }
      data.forEach((item) => {
        const $li = document.createElement("li");
        $li.innerHTML = `
          <button style="background-image: url(${item.previewURL})" data-img="${item.largeImageURL}" class="search_item">
          </button>
        `;
        this.$ul.appendChild($li);
      });

      this.$sentinel = document.createElement("div");
      this.$sentinel.setAttribute("id", "sentinel");
      this.$lastItem = this.$ul.children[this.$ul.children.length - 1];
      this.$lastItem.appendChild(this.$sentinel);

      this.observer.observe(this.$sentinel);
    }
  };
}

export default SearchImage;
