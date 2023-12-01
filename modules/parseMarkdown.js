import { Parser, HtmlRenderer } from 'commonmark';

export default (markdown, options) => {
  console.log('Markdown.markdown:');
  console.log(markdown);
  const reader = new Parser();
  const writer = options ? new HtmlRenderer(options) : new HtmlRenderer();
  const parsed = reader.parse(markdown);
  return writer.render(parsed);
};
