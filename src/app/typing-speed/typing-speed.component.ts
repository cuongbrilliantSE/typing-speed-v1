import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'typing-speed',
  templateUrl: './typing-speed.component.html',
  styleUrls: ['./typing-speed.component.scss'],
})
export class TypingSpeedComponent implements AfterViewInit {
  timer: any;
  seconds = 60;
  currentWordIndex = 0;
  typedWord = '';
  calculateSpan = 0;
  wpm = 0;
  mistake = 0;
  isInputDisabled: boolean = false;

  ngAfterViewInit(): void {
    this.loadParagraph();
  }

  loadParagraph() {
    const paragraph = document.getElementById('row1');
    // @ts-ignore
    paragraph.innerHTML = '';
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    const words = paragraphs[ranIndex].trim().split(' ');
    // Wrap each word with a span tag
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;

      if (index === 0) {
        span.classList.add('highlight'); // Add highlight class to the first word
      }
      // @ts-ignore
      paragraph.appendChild(span);
    });
  }
  initTyping($event: any) {
    const inputField = document.getElementById('inputfield') as HTMLInputElement;
    const spans = document.querySelectorAll('#paragraph span');
    const paragraph = document.getElementById('row1');

    if (/^\s/.test($event.target.value)) {
      $event.target.value = '';
      return;
    }

    if ($event.data === ' ') {
      // @ts-ignore
      this.handleNextWord(inputField, spans, paragraph);
    } else {
      const currentWord = spans[this.currentWordIndex].textContent;
      if (currentWord && currentWord.includes(this.typedWord)) {
        spans[this.currentWordIndex].classList.remove('highlight-wrong');
      } else {
        spans[this.currentWordIndex].classList.add('highlight-wrong');
      }
    }

    this.controlTimer();
  }

  handleNextWord(inputField: HTMLInputElement, spans: NodeListOf<Element>, paragraph: HTMLElement) {
    inputField.value = '';
    const currentSpan = spans[this.currentWordIndex];
    currentSpan?.classList.remove('highlight', 'highlight-wrong');

    // Check if word correct or incorrect
    const typedWord = this.typedWord.trim();
    const isCorrect = currentSpan.textContent === typedWord;
    currentSpan.classList.toggle('correct', isCorrect);
    currentSpan.classList.toggle('wrong', !isCorrect);
    this.mistake += isCorrect ? 0 : 1;

    // Calculate widths
    const spanWidth = currentSpan.getBoundingClientRect().width;
    const paragraphWidth = paragraph.getBoundingClientRect().width;
    this.calculateSpan += spanWidth;

    // Check if scrolled to bottom
    if (this.calculateSpan > paragraphWidth) {
      this.scrollBottom();
      this.calculateSpan = 0;
    }

    // Increment WPM and highlight next word
    this.wpm++;
    this.currentWordIndex++;
    if (this.currentWordIndex < spans.length) {
      spans[this.currentWordIndex].classList.add('highlight');
    }
  }

  scrollBottom() {
    const paragraph = document.getElementById('row1');
    if (paragraph) {
      // Get the current top value and convert it to a number
      let currentTop = parseFloat(paragraph.style.top) || 0;

      currentTop -= 55;

      // Set the new top value
      paragraph.style.top = `${currentTop}px`;
    }
  }

  controlTimer() {
    //timer
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.countDown();
      }, 1000);
    }
  }

  countDown() {
    if (this.seconds <= 59 && this.seconds >= 0) {
      // @ts-ignore
      document.getElementById('timer').innerHTML = this.formatTime(this.seconds);
    }

    if (this.seconds > 0) {
      this.seconds--;
    } else {
      this.isInputDisabled = true;
      clearInterval(this.timer);
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  reloadBtn() {
    location.reload();
  }

  calculateAccuracy() {
    return this.wpm != 0 ? (this.wpm - this.mistake) / this.wpm : 0;
  }
}

export const paragraphs = [
  'trong thế giới hiện đại công nghệ đóng vai trò quan trọng trong cuộc sống hàng ngày của chúng ta từ giao tiếp đến giải trí giáo dục đến kinh doanh công nghệ đã làm thay đổi cách chúng ta tương tác với thế giới xung quanh tuy nhiên với sự tiện ích và lợi ích của công nghệ đến những thách thức và lo ngại những vấn đề như quyền riêng tư dữ liệu an ninh mạng và khoảng cách số đã trở nên ngày càng quan trọng điều quan trọng là điều hướng cảnh quan số với ý thức và trách nhiệm khi chúng ta chấp nhận những tiến bộ của công nghệ hãy ưu tiên đạo đức an ninh và tính bao hàm để tạo ra một tương lai số an toàn và công bằng hơn',
  'trong lĩnh vực y học nghiên cứu và phát triển công nghệ y tế đang đóng vai trò ngày càng quan trọng trong việc cải thiện chăm sóc sức khỏe và điều trị bệnh tật từ các thiết bị y tế thông minh đến ứng dụng di động trong y tế công nghệ đang mang lại những tiện ích và tiến bộ lớn trong ngành y học tuy nhiên cùng với những cơ hội cũng có những thách thức bao gồm bảo mật thông tin bệnh nhân và đạo đức trong việc sử dụng dữ liệu y tế việc kết hợp giữa y học và công nghệ đòi hỏi sự cẩn trọng và tính toàn diện để đảm bảo rằng công nghệ y tế mang lại lợi ích tối đa cho mọi người',
  'đây là một đoạn văn bản tiếng việt được viết mà không sử dụng dấu phẩy chữ hoa hoặc dấu chấm không có nội dung cụ thể chỉ là một bài viết ngắn về việc sử dụng ngôn ngữ và cách mà ngôn ngữ có thể được biểu diễn một cách sáng tạo dù không có các dấu câu nhưng văn bản vẫn có thể truyền đạt ý nghĩa một cách rõ ràng chỉ cần sắp xếp từ và câu một cách logic và hợp lý điều này thể hiện sức mạnh của ngôn ngữ và khả năng của con người trong việc sáng tạo và truyền đạt ý nghĩa hỏi sự cẩn trọng và tính toàn diện để đảm bảo rằng công nghệ y tế mang lại lợi ích tối đa cho mọi người giáo viên văn phòng cuốn sách thành viên',
  'cánh cửa vị trí trường học tháng nghệ thuật bộ phận người bạn ngày học tập đất nước luật pháp chính phủ sự vật mẹ kinh doanh bàn tay phía sau phụ nữ trường hợp công ty và cách mà ngôn ngữ có thể được biểu diễn một cách sáng tạo dù không có các dấu câu nhưng văn bản vẫn có thể truyền đạt ý nghĩa một cách rõ ràng chỉ cần sắp xếp từ và câu một cách logic và hợp lý điều này thể hiện sức mạnh của ngôn ngữ và khả năng của con người trong việc sáng tạo và truyền đạt ý nghĩa hỏi sự cẩn trọng và tính toàn diện để đảm bảo rằng công nghệ y tế mang lại lợi ích tối đa cho mọi người giáo viên văn phòng cuốn sách thành viên',
];
