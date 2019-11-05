export default {
  // The configuration of the editor.
  ckfinder: {
    uploaded: 1,
    url: "/"
    // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
  },
  language: "zh-cn",
  placeholder: "Type the content here!",
  heading: {
    options: [
      {
        model: "paragraph",
        title: "段落 ",
        view: "p",
        class: "ck-heading_paragraph"
      },
      {
        model: "heading1",
        view: "h1",
        title: "标题一 ",
        class: "ck-heading_heading1"
      },
      {
        model: "heading2",
        view: "h2",
        title: "标题二 ",
        class: "ck-heading_heading2"
      },
      {
        model: "heading3",
        view: "h3",
        title: "标题三 ",
        class: "ck-heading_heading3"
      },
      {
        model: "heading4",
        view: "h4",
        title: "标题四 ",
        class: "ck-heading_heading4"
      },
      {
        model: "heading5",
        view: "h5",
        title: "标题五 ",
        class: "ck-heading_heading5"
      },
      {
        model: "heading6",
        view: "h6",
        title: "标题六 ",
        class: "ck-heading_heading6"
      }
      // {
      //   model: "headingFancy",
      //   view: {
      //     name: "h2",
      //     classes: "fancy"
      //   },
      //   title: "Heading 2 (fancy)",
      //   class: "ck-heading_heading2_fancy",
      //   // It needs to be converted before the standard 'heading2'.
      //   converterPriority: "high"
      // }
    ]
  },
  fontSize: {
    options: [8, 10, "default", 14, 16, 18, 20, 22, 24, 26, 28, 32, 48]
  },
  fontFamily: {
    options: [
      "宋体",
      "仿宋",
      "微软雅黑",
      "黑体",
      "仿宋_GB2312",
      "楷体",
      "隶书",
      "幼圆",
      "TimesNewRoman"
    ]
  },
  // fontColor:{
  //   colors:[
  //     {
  //         color: 'hsl(0, 0%, 0%)',
  //         label: 'Black'
  //     },
  //     {
  //         color: 'hsl(0, 0%, 30%)',
  //         label: 'Dim grey'
  //     },
  //     {
  //         color: 'hsl(0, 0%, 60%)',
  //         label: 'Grey'
  //     },
  //     {
  //         color: 'hsl(0, 0%, 90%)',
  //         label: 'Light grey'
  //     },
  //     {
  //         color: 'hsl(0, 0%, 100%)',
  //         label: 'White',
  //         hasBorder: true
  //     }
  //   ]
  // },
  alignment: {
    options: ["left", "right", "center", "justify"]
  },
  indentBlock: {
    offset: 1,
    unit: "em"
  },
  toolbar: {
    items: [
      "heading",
      "|",
      "fontSize",
      "fontFamily",
      "|",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "|",
      "alignment:left",
      "alignment:center",
      "alignment:right",
      "alignment:justify",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "indent",
      "outdent",
      "blockQuote",
      "code",
      "|",
      "horizontalLine",
      "link",
      "imageUpload",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo"
    ]
  }
};
