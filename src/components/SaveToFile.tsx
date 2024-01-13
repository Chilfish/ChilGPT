import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

interface Content {
  content: string;
  role: string;
}

const prefix = 'ChillGPT';

export const saveAsPng = async () => {
  const canvas = await html2canvas(document.documentElement);
  const filename = Date.now();
  canvas.toBlob((blob) => saveAs(blob, `${prefix} - ${filename}.png`), 'image/png');
};

export const saveAsMd = async () => {
  const mes = JSON.parse(localStorage.getItem('messageList'));
  let content: string = '';

  mes.forEach((ele: Content) => {
    if (ele.role === 'user') {
      content += `\n> ${ele.content}\n`;
    } else {
      content += `\n${ele.content}\n`;
    }
  });

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const filename = Date.now();
  saveAs(blob, `${prefix} - ${filename}.md`);
};
