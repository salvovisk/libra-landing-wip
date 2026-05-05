const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.libracolf.it";
const APP_URL = "https://app.libracolf.it";
const LOGO_SVG = `<?xml version="1.0" encoding="UTF-8"?><svg id="uuid-8d9ab56b-2454-4b4d-a6ae-7f7b2f1cfdc1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 301.73 92.35"><g id="uuid-67100964-76cc-412e-b01e-a109af01dc74"><path d="M93.24,47.28l14.22.1c1.1,0,1.65.59,1.64,1.74l-.04,5.68c0,1.16-.56,1.73-1.67,1.72l-22.39-.17c-1.1,0-1.65-.59-1.64-1.75l.29-38.72c0-1.16.57-1.73,1.67-1.72l6.46.05c1.14,0,1.71.59,1.7,1.75l-.23,31.31Z" style="fill:#2a4697;"/><path d="M121.41,54.96c0,1.12-.53,1.67-1.56,1.66l-6.23-.05c-1.03,0-1.54-.57-1.53-1.69l.21-28.5c0-1.08.53-1.61,1.55-1.6l6.23.05c1.03,0,1.54.55,1.53,1.62l-.21,28.5ZM121.72,19.95c0,1.12-.53,1.67-1.55,1.66l-6.34-.05c-1.03,0-1.54-.57-1.53-1.68l.03-3.76c0-1.08.53-1.61,1.55-1.6l6.34.05c1.03,0,1.54.55,1.53,1.62l-.03,3.76Z" style="fill:#2a4697;"/><path d="M134.54,55.42c-.08.88-.62,1.31-1.61,1.3l-5.54-.04c-1.03,0-1.54-.57-1.53-1.68l.29-38.9c0-1.08.53-1.61,1.55-1.6l6.17.05c1.07,0,1.6.55,1.59,1.62l-.09,12.43c.77-1.35,2-2.41,3.68-3.17,1.68-.76,3.46-1.14,5.32-1.13,4,.03,7.06,1.45,9.2,4.25,2.13,2.8,3.18,6.96,3.14,12.45-.04,5.5-1.15,9.62-3.32,12.38-2.17,2.75-5.26,4.11-9.26,4.08-1.9-.01-3.73-.44-5.47-1.27-1.75-.83-3.01-1.96-3.8-3.4l-.31,2.63ZM141.21,49.85c2.02.02,3.52-.68,4.5-2.09.98-1.41,1.48-3.68,1.51-6.83.02-3.19-.44-5.49-1.41-6.91-.96-1.42-2.45-2.14-4.47-2.15-4.04-.03-6.08,2.94-6.12,8.92-.04,6.02,1.95,9.04,5.99,9.07Z" style="fill:#2a4697;"/><path d="M166.88,25.18c.95,0,1.48.49,1.59,1.45l.43,4.07c.7-1.55,1.82-2.9,3.37-4.07,1.55-1.16,3.35-1.74,5.41-1.72.99,0,1.48.51,1.47,1.5l-.05,6.57c0,.88-.47,1.31-1.38,1.3-.19,0-.5-.02-.94-.07-.44-.04-.83-.07-1.17-.07-2.02-.02-3.63.69-4.84,2.12-1.21,1.43-1.82,3.23-1.84,5.42l-.1,13.62c0,1.12-.53,1.67-1.56,1.66l-6.17-.05c-1.07,0-1.6-.57-1.59-1.69l.21-28.5c0-1.08.55-1.61,1.61-1.6l5.54.04Z" style="fill:#2a4697;"/><path d="M205.73,55.58c0,1.12-.53,1.67-1.56,1.66l-5.2-.04c-.91,0-1.44-.45-1.59-1.33l-.32-2.63c-2.08,2.93-5.44,4.38-10.09,4.35-2.93-.02-5.28-.84-7.04-2.44-1.76-1.61-2.63-3.92-2.6-6.95.01-1.75.34-3.26.98-4.53.64-1.27,1.47-2.28,2.51-3.03,1.03-.75,2.43-1.34,4.18-1.76,1.76-.43,3.52-.72,5.29-.89,1.77-.17,3.95-.26,6.54-.28v-1.14c.03-2.99-1.92-4.5-5.84-4.53-2.63-.02-5.37.52-8.24,1.61-.99.43-1.64.09-1.93-1.03l-1.12-3.71c-.3-.92.01-1.59.93-2.02,3.44-1.53,7.37-2.28,11.79-2.24,9.03.07,13.51,3.88,13.46,11.45l-.14,19.48ZM196.8,42.91c-3.7.05-6.38.4-8.06,1.05-1.68.64-2.53,1.86-2.54,3.66,0,1.12.37,2.01,1.12,2.7.76.68,1.8,1.03,3.13,1.04,2.09.02,3.67-.52,4.72-1.61,1.06-1.09,1.59-2.53,1.6-4.32l.02-2.51Z" style="fill:#2a4697;"/><path d="M84.47,79.11l.04-9.88h1.26s-.03,8.77-.03,8.77l4.58.02v1.11s-5.84-.02-5.84-.02Z" style="fill:#1e1f1d;"/><path d="M93.54,79.32c-.47,0-.89-.09-1.28-.27-.38-.18-.69-.44-.91-.78-.22-.34-.34-.75-.33-1.24,0-.42.09-.77.26-1.03.17-.26.39-.47.68-.62.28-.15.59-.26.93-.34.34-.07.68-.13,1.03-.18.44-.06.8-.1,1.08-.13.28-.03.48-.08.62-.16.13-.07.2-.2.2-.38v-.04c0-.31-.06-.57-.17-.79-.11-.21-.29-.38-.52-.5-.23-.12-.52-.17-.86-.18-.35,0-.66.05-.91.16s-.46.25-.62.41c-.16.17-.28.33-.36.51l-1.15-.38c.19-.45.45-.8.77-1.05.32-.25.68-.43,1.07-.54s.77-.16,1.15-.16c.25,0,.53.03.84.09.32.06.62.18.91.36.29.18.54.44.73.79.19.35.29.81.28,1.39l-.02,4.89h-1.17s0-1.01,0-1.01h-.08c-.08.17-.22.35-.41.53-.19.18-.43.34-.72.46-.3.12-.65.18-1.07.18ZM93.75,78.26c.44,0,.82-.08,1.12-.25.31-.17.54-.39.7-.67.16-.28.24-.56.24-.86v-1.03c-.04.06-.15.11-.31.15s-.35.09-.56.12-.41.06-.61.09c-.2.02-.35.04-.47.05-.29.03-.56.09-.81.18-.25.08-.45.21-.6.38-.15.17-.23.39-.23.67,0,.26.06.47.2.64s.31.3.54.39c.23.09.49.13.79.14Z" style="fill:#1e1f1d;"/><path d="M100.49,79.17l-2.8-7.42h1.31s1.56,4.41,1.56,4.41c.17.46.31.91.42,1.36.12.45.24.89.36,1.32h-.44c.13-.43.25-.86.37-1.32.12-.45.26-.91.43-1.36l1.59-4.39h1.31s-2.86,7.41-2.86,7.41h-1.25Z" style="fill:#1e1f1d;"/><path d="M108.19,79.36c-.67,0-1.26-.16-1.77-.48-.5-.32-.9-.77-1.18-1.34s-.42-1.24-.42-2c0-.77.15-1.45.43-2.02.29-.58.68-1.02,1.19-1.34.51-.32,1.1-.47,1.77-.47.68,0,1.27.16,1.78.48.51.32.9.77,1.18,1.35.28.58.42,1.25.42,2.03,0,.76-.15,1.43-.43,2-.29.57-.68,1.02-1.19,1.33-.51.32-1.1.47-1.78.47ZM108.19,78.29c.5,0,.91-.12,1.23-.38.32-.26.56-.59.72-1.01.16-.42.23-.87.24-1.35,0-.49-.07-.95-.23-1.37-.15-.42-.39-.76-.71-1.02-.32-.26-.73-.39-1.23-.39-.5,0-.9.13-1.22.38-.32.26-.56.6-.71,1.02-.16.42-.24.88-.24,1.37,0,.49.07.94.23,1.36.15.42.39.76.71,1.01.32.26.72.39,1.22.39Z" style="fill:#1e1f1d;"/><path d="M112.77,79.22l.03-7.41h1.15s0,1.15,0,1.15h.08c.14-.38.38-.68.74-.9.35-.23.75-.34,1.19-.34.09,0,.19,0,.31,0,.12,0,.22.01.29.02v1.2s-.13-.02-.27-.04c-.14-.02-.29-.03-.45-.03-.35,0-.67.07-.95.22-.28.15-.5.35-.66.61s-.24.55-.24.89l-.02,4.64h-1.19Z" style="fill:#1e1f1d;"/><path d="M119.41,79.41c-.47,0-.89-.09-1.28-.27-.38-.18-.69-.44-.91-.78-.22-.34-.34-.75-.33-1.24,0-.42.09-.77.26-1.03.17-.26.39-.47.68-.62.28-.15.59-.26.93-.34.34-.07.68-.13,1.03-.18.44-.06.8-.1,1.08-.13.28-.03.48-.08.62-.16.13-.07.2-.2.2-.38v-.04c0-.31-.06-.57-.17-.79-.11-.21-.29-.38-.52-.5s-.52-.17-.86-.18c-.35,0-.66.05-.91.16s-.46.25-.62.41c-.16.17-.28.33-.36.51l-1.15-.38c.19-.45.45-.8.77-1.05.32-.25.68-.43,1.07-.54s.77-.16,1.15-.16c.25,0,.53.03.84.09.32.06.62.18.91.36.29.18.54.44.73.79.19.35.29.81.28,1.39l-.02,4.89h-1.17s0-1.01,0-1.01h-.08c-.08.17-.22.35-.41.53-.19.18-.43.34-.72.46-.3.12-.65.18-1.07.18ZM119.62,78.36c.44,0,.82-.08,1.12-.25.31-.17.54-.39.7-.67.16-.28.24-.56.24-.86v-1.03c-.04.06-.15.11-.31.15s-.35.09-.56.12-.41.06-.61.09c-.2.02-.35.04-.47.05-.29.03-.56.09-.81.18-.25.08-.45.21-.6.38-.15.17-.23.39-.23.67,0,.26.06.47.2.64s.31.3.54.39c.23.09.49.13.79.14Z" style="fill:#1e1f1d;"/><path d="M127.36,71.86v1.02s-3.84-.01-3.84-.01v-1.02s3.84.01,3.84.01ZM124.65,70.08h1.19s-.03,7.26-.03,7.26c0,.33.06.57.2.73s.36.23.67.23c.08,0,.17,0,.29-.02.12-.02.22-.03.32-.05l.24,1.01c-.12.04-.26.08-.42.1-.16.02-.31.03-.47.03-.64,0-1.14-.17-1.5-.51-.36-.34-.53-.81-.53-1.42l.03-7.35Z" style="fill:#1e1f1d;"/><path d="M131.2,79.44c-.67,0-1.26-.16-1.77-.48-.5-.32-.9-.77-1.18-1.34s-.42-1.24-.42-2c0-.77.15-1.45.43-2.02.29-.58.68-1.02,1.19-1.34.51-.32,1.1-.47,1.77-.47.68,0,1.27.16,1.78.48.51.32.9.77,1.18,1.35.28.58.42,1.25.42,2.03,0,.76-.15,1.43-.43,2-.29.57-.68,1.02-1.19,1.33-.51.32-1.1.47-1.78.47ZM131.21,78.38c.5,0,.91-.12,1.23-.38s.56-.59.72-1.01c.16-.42.23-.87.24-1.35,0-.49-.07-.95-.23-1.37-.15-.42-.39-.76-.71-1.02-.32-.26-.73-.39-1.23-.39-.5,0-.9.13-1.22.38-.32.26-.56.6-.71,1.02-.16.42-.24.88-.24,1.37,0,.49.07.94.23,1.36.15.42.39.76.71,1.01.32.26.72.39,1.22.39Z" style="fill:#1e1f1d;"/><path d="M135.79,79.3l.03-7.41h1.15s0,1.15,0,1.15h.08c.14-.38.38-.68.74-.9.35-.23.75-.34,1.19-.34.09,0,.19,0,.31,0,.12,0,.22,0,.29.01v1.2s-.13-.02-.27-.04-.29-.03-.45-.03c-.35,0-.67.07-.95.22-.28.15-.5.35-.66.61s-.24.55-.24.89l-.02,4.64h-1.19Z" style="fill:#1e1f1d;"/><path d="M141.12,70.7c-.23,0-.42-.08-.58-.23s-.24-.34-.24-.56c0-.22.08-.41.25-.56.16-.15.36-.23.58-.23.23,0,.43.08.59.23.16.15.24.34.24.56,0,.22-.08.4-.25.56s-.36.23-.59.23ZM140.49,79.32l.03-7.41h1.19s-.03,7.42-.03,7.42h-1.19Z" style="fill:#1e1f1d;"/><path d="M149.29,79.51c-.61,0-1.16-.16-1.63-.48s-.84-.76-1.1-1.34c-.26-.58-.39-1.26-.39-2.04,0-.78.14-1.46.41-2.03.27-.57.64-1.01,1.12-1.32.47-.31,1.02-.46,1.63-.46.48,0,.86.08,1.15.24.28.16.5.34.65.54.15.2.27.37.35.5h.09s.01-3.65.01-3.65h1.19s-.04,9.88-.04,9.88h-1.15s0-1.15,0-1.15h-.13c-.08.14-.2.31-.36.51-.16.21-.38.39-.67.55-.29.16-.67.24-1.14.24ZM149.47,78.44c.45,0,.83-.12,1.14-.35.31-.24.55-.56.71-.98s.24-.9.24-1.45c0-.55-.07-1.03-.23-1.44-.16-.41-.39-.73-.7-.96s-.69-.35-1.15-.35c-.47,0-.86.12-1.17.36-.31.24-.55.57-.7.98-.16.41-.24.88-.24,1.39,0,.52.08.99.23,1.41.16.42.39.76.7,1.01.31.25.7.38,1.16.38Z" style="fill:#1e1f1d;"/><path d="M157.3,79.54c-.67,0-1.26-.16-1.77-.48-.5-.32-.9-.77-1.18-1.34s-.42-1.24-.42-2c0-.77.15-1.45.43-2.02.29-.58.68-1.02,1.19-1.34.51-.32,1.1-.47,1.77-.47.68,0,1.27.16,1.78.48.51.32.9.77,1.18,1.35.28.58.42,1.25.42,2.03,0,.76-.15,1.43-.43,2-.29.57-.68,1.02-1.19,1.33-.51.32-1.1.47-1.78.47ZM157.3,78.47c.5,0,.91-.12,1.23-.38.32-.26.56-.59.72-1.01.16-.42.23-.87.24-1.35,0-.49-.07-.95-.23-1.37-.15-.42-.39-.76-.71-1.02-.32-.26-.73-.39-1.23-.39-.5,0-.9.13-1.22.38-.32.26-.56.6-.71,1.02-.16.42-.24.88-.24,1.37,0,.49.07.94.23,1.36.15.42.39.76.71,1.01.32.26.72.39,1.22.39Z" style="fill:#1e1f1d;"/><path d="M161.88,79.4l.03-7.41h1.16s0,1.66,0,1.66h-.09c.1-.4.26-.73.48-1,.22-.26.48-.46.77-.59s.6-.2.92-.2c.54,0,.98.17,1.31.5.33.33.55.77.64,1.31h-.16c.09-.37.25-.69.49-.96s.52-.48.85-.62.7-.22,1.09-.21c.43,0,.82.1,1.17.28.35.19.63.47.84.85.21.38.31.85.31,1.43l-.02,5h-1.19s.02-4.97.02-4.97c0-.53-.15-.92-.45-1.15-.3-.23-.65-.35-1.05-.35-.33,0-.62.07-.86.21-.24.14-.43.33-.56.57-.13.24-.2.52-.2.83l-.02,4.84h-1.19s.02-5.09.02-5.09c0-.41-.13-.74-.41-1-.27-.25-.62-.38-1.04-.38-.29,0-.56.07-.81.2-.25.13-.46.33-.62.6s-.23.59-.24.99l-.02,4.67h-1.19Z" style="fill:#1e1f1d;"/><path d="M176.35,79.61c-.72,0-1.33-.16-1.85-.48-.52-.32-.92-.77-1.19-1.34-.28-.57-.42-1.24-.41-2,0-.76.14-1.43.42-2.01s.67-1.03,1.17-1.36c.5-.33,1.09-.49,1.76-.48.39,0,.78.07,1.16.2.38.13.73.34,1.04.63.31.29.56.67.74,1.15.18.47.27,1.05.27,1.74v.5s-5.76-.02-5.76-.02v-1.01s5.12.02,5.12.02l-.56.37c0-.49-.07-.92-.22-1.3-.15-.38-.38-.67-.68-.89-.3-.22-.67-.32-1.12-.33-.45,0-.83.11-1.15.32-.32.22-.56.5-.73.85-.17.35-.25.73-.26,1.13v.67c0,.55.09,1.01.28,1.4.19.38.45.67.8.87.34.2.74.3,1.19.3.29,0,.56-.04.8-.12.24-.08.44-.21.62-.38.17-.17.31-.38.4-.63l1.15.32c-.12.37-.31.7-.59.98-.28.28-.62.5-1.02.66-.41.16-.86.24-1.37.23Z" style="fill:#1e1f1d;"/><path d="M183.12,79.64c-.51,0-.96-.08-1.35-.23-.4-.15-.72-.37-.98-.66-.26-.29-.43-.65-.51-1.08l1.13-.27c.1.41.3.71.6.9.29.19.66.29,1.1.29.52,0,.93-.11,1.24-.33.31-.22.46-.48.46-.79,0-.26-.09-.47-.27-.64-.18-.17-.45-.3-.82-.38l-1.23-.3c-.67-.16-1.17-.41-1.5-.74-.33-.34-.49-.76-.49-1.29,0-.42.12-.8.36-1.12.24-.32.57-.58.98-.76.41-.18.88-.27,1.41-.27.51,0,.94.08,1.3.23.36.15.64.36.87.63s.39.58.5.93l-1.08.27c-.1-.27-.27-.51-.5-.72-.24-.22-.59-.33-1.07-.33-.44,0-.81.1-1.1.3-.29.2-.44.46-.44.77,0,.27.1.49.3.66.2.17.51.3.95.4l1.12.27c.67.16,1.17.41,1.49.75.32.33.48.76.48,1.26,0,.43-.13.82-.37,1.16s-.59.6-1.03.79c-.44.19-.95.29-1.53.29Z" style="fill:#1e1f1d;"/><path d="M190.17,72.09v1.02s-3.84-.01-3.84-.01v-1.02s3.84.01,3.84.01ZM187.46,70.32h1.19s-.03,7.26-.03,7.26c0,.33.06.57.2.73s.36.23.67.23c.08,0,.17,0,.29-.02.12-.02.22-.03.32-.05l.24,1.01c-.12.04-.26.08-.42.1-.16.02-.31.03-.47.03-.64,0-1.14-.17-1.5-.51-.36-.34-.53-.81-.53-1.42l.03-7.35Z" style="fill:#1e1f1d;"/><path d="M191.76,70.88c-.23,0-.42-.08-.58-.23s-.24-.34-.24-.56c0-.22.08-.41.25-.56.16-.15.36-.23.58-.23.23,0,.43.08.59.23.16.15.24.34.24.56,0,.22-.08.4-.25.56s-.36.23-.59.23ZM191.13,79.51l.03-7.41h1.19s-.03,7.42-.03,7.42h-1.19Z" style="fill:#1e1f1d;"/><path d="M196.89,79.69c-.67,0-1.26-.16-1.77-.48-.5-.32-.9-.77-1.18-1.34s-.42-1.24-.42-2c0-.77.15-1.45.43-2.02.29-.58.68-1.02,1.19-1.34.51-.32,1.1-.47,1.77-.47.36,0,.7.05,1.01.14.32.09.61.23.87.4.26.18.49.39.68.65.19.25.33.54.43.87l-1.15.32c-.05-.19-.13-.36-.24-.52s-.24-.3-.4-.42c-.16-.12-.34-.21-.54-.27s-.43-.1-.67-.1c-.5,0-.9.13-1.22.38-.32.26-.56.6-.71,1.02-.16.42-.24.88-.24,1.37,0,.49.07.94.23,1.36.15.42.39.76.71,1.01.32.26.72.39,1.22.39.25,0,.48-.03.68-.1.21-.07.39-.16.55-.28.16-.12.3-.27.41-.43s.19-.35.25-.55l1.14.33c-.1.33-.24.63-.44.88-.19.26-.42.48-.69.66-.27.18-.56.32-.88.41-.32.09-.67.14-1.03.14Z" style="fill:#1e1f1d;"/><path d="M201.72,70.92c-.23,0-.42-.08-.58-.23-.16-.16-.24-.34-.24-.56,0-.22.08-.41.25-.56.16-.15.36-.23.58-.23.23,0,.43.08.59.23.16.15.24.34.24.56,0,.22-.08.4-.25.56-.16.15-.36.23-.59.23ZM201.09,79.54l.03-7.41h1.19s-.03,7.42-.03,7.42h-1.19Z" style="fill:#1e1f1d;"/><path d="M227.92,58.72c-2.74-.01-5.16-.6-7.25-1.76-2.09-1.16-3.73-2.96-4.92-5.4-1.19-2.43-1.78-5.54-1.77-9.33.01-3.94.65-7.15,1.89-9.61,1.25-2.46,2.96-4.27,5.13-5.42,2.17-1.15,4.63-1.72,7.38-1.71,1.52,0,3.02.18,4.48.52,1.46.34,2.65.76,3.57,1.24l-1.56,4.36c-.91-.36-1.98-.7-3.2-1.03-1.22-.32-2.36-.49-3.43-.49-6.02-.02-9.04,4.01-9.07,12.1-.01,3.86.71,6.83,2.17,8.88,1.46,2.06,3.64,3.09,6.53,3.1,1.64,0,3.1-.17,4.4-.52,1.3-.35,2.48-.79,3.55-1.3l-.02,4.66c-1.03.55-2.17.98-3.4,1.27-1.24.29-2.73.44-4.49.43Z" style="fill:#2a3547;"/><path d="M267.06,42.19c-.02,5.3-1.32,9.4-3.9,12.3-2.58,2.9-6.06,4.34-10.44,4.32-2.7-.01-5.11-.67-7.22-1.97-2.11-1.3-3.77-3.2-4.98-5.7-1.21-2.49-1.81-5.51-1.79-9.06.02-5.3,1.3-9.38,3.84-12.24,2.54-2.86,6.02-4.28,10.44-4.26,2.74.01,5.18.67,7.31,1.97,2.13,1.3,3.79,3.18,4.98,5.64,1.19,2.45,1.78,5.45,1.77,9ZM243.93,42.11c-.01,3.79.69,6.78,2.11,9,1.42,2.22,3.69,3.33,6.82,3.34,3.08.01,5.35-1.09,6.81-3.29,1.46-2.21,2.19-5.2,2.2-8.98.01-3.78-.7-6.75-2.14-8.91-1.44-2.16-3.72-3.24-6.84-3.25-3.12-.01-5.39,1.06-6.81,3.2-1.42,2.15-2.13,5.11-2.15,8.9Z" style="fill:#2a3547;"/><path d="M277.29,58.3l-5.03-.02.17-45.41,5.03.02-.17,45.41Z" style="fill:#2a3547;"/><path d="M298.53,30.42l-7.71-.03-.1,27.97-5.03-.02.1-27.97-5.37-.02v-2.45s5.39-1.77,5.39-1.77v-1.85c.02-4.14.9-7.12,2.64-8.92,1.74-1.81,4.19-2.7,7.35-2.69,1.18,0,2.29.12,3.31.34,1.03.22,1.9.48,2.62.76l-1.33,4.12c-.61-.2-1.31-.4-2.11-.61-.8-.2-1.62-.3-2.46-.31-1.68,0-2.93.58-3.75,1.75-.82,1.17-1.24,3.01-1.25,5.52v2.09s7.71.03,7.71.03l-.02,4.06Z" style="fill:#2a3547;"/><path d="M65.82,45.89c-.88,0-1.59-.71-1.59-1.59V13.03c0-5.43-4.42-9.84-9.84-9.84H13.1C7.68,3.19,3.26,7.61,3.26,13.03v8.43c0,.88-.71,1.59-1.59,1.6h0c-.88,0-1.59-.71-1.59-1.59v-8.43C.07,5.85,5.92,0,13.1,0h41.27c7.19,0,13.03,5.85,13.03,13.03v31.27c0,.88-.71,1.59-1.59,1.59Z" style="fill:#2a3547;"/><path d="M54.31,92.35H13.03c-7.19,0-13.03-5.85-13.03-13.03v-12.77c0-.88.71-1.59,1.59-1.59s1.59.71,1.59,1.59v12.77c0,5.43,4.42,9.84,9.84,9.84h41.27c5.43,0,9.84-4.42,9.84-9.84v-4.48c0-.88.71-1.59,1.59-1.59s1.59.71,1.59,1.59v4.48c0,7.19-5.85,13.03-13.03,13.03Z" style="fill:#2a3547;"/><rect x="9.07" y="77.71" width="32.85" height="2.82" rx="1.23" ry="1.23" style="fill:#2a3547; opacity:.24;"/><rect x="9.07" y="71.97" width="32.85" height="2.82" rx="1.23" ry="1.23" style="fill:#2a3547; opacity:.24;"/><rect x="9.07" y="83.02" width="22.19" height="2.82" rx="1.23" ry="1.23" style="fill:#2a3547; opacity:.24;"/><rect x="25.76" y="18.67" width="33.08" height="3" rx="1.31" ry="1.31" transform="translate(84.6 40.35) rotate(180)" style="fill:#2a3547; opacity:.24;"/><rect x="36.5" y="12.72" width="22.34" height="3" rx="1.31" ry="1.31" transform="translate(95.34 28.45) rotate(180)" style="fill:#2a3547; opacity:.24;"/><g style="opacity:.6;"><path d="M54.07,40.02c-.31-.73-.73-1.4-1.23-1.99l1.39-4.27-.42-.14c-2.2-.72-4.49-1.08-6.81-1.08s-4.61.36-6.81,1.08l-.42.14,1.39,4.27c-1.17,1.39-1.87,3.21-1.87,5.19,0,.3.02.61.06.94.45,4,3.75,7.02,7.66,7.02,4.26,0,7.72-3.57,7.72-7.96,0-1.11-.22-2.19-.65-3.2ZM53.11,34.34l-.96,2.96c-1.11-1.02-2.5-1.72-4-1.95-.36-.05-.69-.08-1.01-.08-.05,0-.09,0-.13,0-1.98,0-3.78.77-5.15,2.03l-.96-2.96c3.96-1.2,8.25-1.2,12.22,0ZM47,50.12c-3.23,0-5.96-2.39-6.54-5.63.46-.46.49-1.34,1.35-1.85.82-.48,5.27-1.2,6.09-4.01.01.03.02.07.04.1.22.5.53.98.95,1.4,1.25,1.25,3.03,1.6,4.45,1.01.2.67.31,1.36.31,2.07,0,3.8-2.98,6.9-6.65,6.9Z" style="fill:#010101;"/><path d="M53.4,51.83h-12.8c-.43,0-.78.35-.78.78v11.62c0,.43.35.78.78.78h12.8c.43,0,.79-.35.79-.78v-11.62c0-.43-.35-.78-.79-.78ZM40.51,63.78l.03-10.69c0-.3.24-.54.54-.54h1.43c.3,0,.54.24.54.54v2.75c0,.56.61.9,1.09.62.87-.5,1.83-.78,2.86-.78s1.99.28,2.86.78c.49.28,1.09-.06,1.09-.62v-2.75c0-.3.24-.54.54-.54h1.33c.3,0,.54.24.54.54l.03,10.69c0,.3-.24.54-.54.54h-11.8c-.3,0-.54-.24-.54-.54Z" style="fill:#010101;"/><path d="M27.76,40.02c-.31-.73-.73-1.4-1.23-1.99l1.39-4.27-.42-.14c-2.2-.72-4.49-1.08-6.81-1.08s-4.61.36-6.81,1.08l-.42.14,1.39,4.27c-1.17,1.39-1.87,3.21-1.87,5.19,0,.3.02.61.06.94.45,4,3.75,7.02,7.66,7.02,4.26,0,7.72-3.57,7.72-7.96,0-1.11-.22-2.19-.65-3.2ZM26.8,34.34l-.96,2.96c-1.11-1.02-2.5-1.72-4-1.95-.36-.05-.69-.08-1.01-.08-.05,0-.09,0-.13,0-1.98,0-3.78.77-5.15,2.03l-.96-2.96c3.96-1.2,8.25-1.2,12.22,0ZM20.69,50.12c-3.23,0-5.96-2.39-6.54-5.63.46-.46.49-1.34,1.35-1.85.82-.48,5.27-1.2,6.09-4.01.01.03.02.07.04.1.22.5.53.98.95,1.4,1.25,1.25,3.03,1.6,4.45,1.01.2.67.31,1.36.31,2.07,0,3.8-2.98,6.9-6.65,6.9Z" style="fill:#010101;"/><path d="M27.09,51.83h-12.8c-.43,0-.78.35-.78.78v11.62c0,.43.35.78.78.78h12.8c.43,0,.79-.35.79-.78v-11.62c0-.43-.35-.78-.79-.78ZM14.2,63.78l.03-10.69c0-.3.24-.54.54-.54h1.43c.3,0,.54.24.54.54v2.75c0,.56.61.9,1.09.62.87-.5,1.83-.78,2.86-.78s1.99.28,2.86.78c.49.28,1.09-.06,1.09-.62v-2.75c0-.3.24-.54.54-.54h1.33c.3,0,.54.24.54.54l.03,10.69c0,.3-.24.54-.54.54h-11.8c-.3,0-.54-.24-.54-.54Z" style="fill:#010101;"/></g><circle cx="33.78" cy="39.77" r="8.81" style="fill:#c7e5f9;"/><path d="M42.06,36.14c-.36-.84-.84-1.61-1.42-2.29l1.6-4.93-.49-.16c-2.54-.83-5.19-1.25-7.86-1.25s-5.32.42-7.87,1.25l-.49.16,1.6,4.93c-1.35,1.61-2.17,3.71-2.17,5.99,0,.35.02.71.07,1.09.52,4.62,4.33,8.11,8.85,8.11,4.92,0,8.91-4.13,8.91-9.2,0-1.28-.25-2.52-.75-3.7ZM40.94,29.58l-1.11,3.42c-1.28-1.18-2.89-1.99-4.62-2.25-.41-.06-.79-.09-1.17-.1-.05,0-.11,0-.16,0-2.28,0-4.37.89-5.95,2.35l-1.11-3.42c4.58-1.38,9.53-1.38,14.11,0ZM33.89,47.81c-3.73,0-6.89-2.76-7.55-6.51.53-.53.57-1.55,1.56-2.13.94-.55,6.09-1.38,7.03-4.63.02.04.03.08.04.12.25.58.62,1.14,1.1,1.62,1.45,1.45,3.5,1.85,5.14,1.17.23.77.35,1.57.35,2.39,0,4.39-3.45,7.97-7.68,7.97Z" style="fill:#2a4697;"/><rect x="26.05" y="50.6" width="15.53" height="14.02" style="fill:#c7e5f9;"/><path d="M41.28,49.79h-14.79c-.5,0-.91.41-.91.91v13.43c0,.5.41.91.91.91h14.79c.5,0,.91-.41.91-.91v-13.43c0-.5-.41-.91-.91-.91ZM26.39,63.58l.03-12.35c0-.35.28-.63.63-.63h1.65c.35,0,.63.28.63.63v3.17c0,.65.7,1.04,1.26.72,1-.57,2.12-.9,3.3-.9s2.3.32,3.3.9c.56.32,1.26-.07,1.26-.72v-3.17c0-.35.28-.63.63-.63h1.54c.35,0,.63.28.63.63l.03,12.35c0,.35-.28.63-.63.63h-13.63c-.35,0-.63-.28-.63-.63Z" style="fill:#2a4697;"/></g></svg>`;
const LOGO_DATA_URI = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(LOGO_SVG)}`;

export type EmailTemplatePreview = {
  id: string;
  label: string;
  subject: string;
  preheader: string;
  ctaHref: string;
  html: string;
};

type SummaryItem = {
  title: string;
  text: string;
};

const HEADING_STACK = "'Manrope','Inter','Helvetica Neue',Arial,sans-serif";
const BODY_STACK = "'Inter','Helvetica Neue',Arial,sans-serif";

function renderEmailLogo() {
  return `
    <img
      src="${LOGO_DATA_URI}"
      alt="Libra Colf"
      width="164"
      height="50"
      style="display:block;width:164px;height:auto;border:0;"
    />
  `;
}

function renderSummaryItems(items: SummaryItem[]) {
  return items
    .map(
      (item, index) => `
        <tr>
          <td style="padding:${index === 0 ? "4px" : "18px"} 0 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:0 0 10px;border-bottom:1px solid #dbe3f0;">
                  <p style="margin:0 0 6px;font-family:${BODY_STACK};font-size:12px;line-height:1.4;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#0b3b88;">
                    ${item.title}
                  </p>
                  <p style="margin:0;font-family:${BODY_STACK};font-size:16px;line-height:1.65;color:#0f172a;">
                    ${item.text}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderEmailShell({
  preheader,
  eyebrow,
  title,
  intro,
  bodyHtml,
  ctaLabel,
  ctaHref,
  summaryItems,
  footerNote,
}: {
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaHref?: string;
  summaryItems: SummaryItem[];
  footerNote: string;
}) {
  const domain = SITE_URL.replace(/^https?:\/\//, "");
  return `<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fb;font-family:${BODY_STACK};color:#0f172a;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f5f7fb;">${preheader}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fb;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
            <tr>
              <td style="padding:0 4px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      ${renderEmailLogo()}
                    </td>
                    <td align="right" style="font-family:${BODY_STACK};font-size:12px;line-height:1;color:#5f6b84;">
                      ${domain}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border:1px solid #dbe3f0;border-radius:28px;overflow:hidden;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="background:#0b3b88;padding:36px 40px 32px;">
                      <p style="margin:0 0 22px;font-family:${BODY_STACK};font-size:11px;line-height:1;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#9bb6e4;">
                        ${eyebrow}
                      </p>
                      <h1 style="margin:0;font-family:${HEADING_STACK};font-size:34px;line-height:1.1;font-weight:800;letter-spacing:-0.025em;color:#ffffff;">
                        ${title}
                      </h1>
                      <p style="margin:16px 0 0;font-family:${BODY_STACK};font-size:16px;line-height:1.6;color:#c9d7ee;max-width:460px;">
                        ${intro}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:36px 40px 8px;">
                      <div style="font-family:${BODY_STACK};font-size:16px;line-height:1.7;color:#0f172a;">
                        ${bodyHtml}
                      </div>
                    </td>
                  </tr>
                  ${
                    ctaLabel && ctaHref
                      ? `<tr>
                    <td style="padding:20px 40px 36px;">
                      <table role="presentation" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="border-radius:14px;background:#0b3b88;">
                            <a href="${ctaHref}" style="display:inline-block;padding:15px 26px;font-family:${BODY_STACK};font-size:15px;font-weight:700;letter-spacing:-0.005em;color:#ffffff;text-decoration:none;border-radius:14px;">
                              ${ctaLabel}&nbsp;&rarr;
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding:0 40px 36px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #dbe3f0;">
                        <tr>
                          <td style="padding-top:24px;">
                            <p style="margin:0 0 4px;font-family:${HEADING_STACK};font-size:13px;line-height:1;font-weight:700;letter-spacing:-0.01em;color:#0f172a;">
                              In sintesi
                            </p>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                              ${renderSummaryItems(summaryItems)}
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 8px 0;">
                <p style="margin:0;font-family:${BODY_STACK};font-size:13px;line-height:1.7;color:#5f6b84;">
                  ${footerNote}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 8px 0;">
                <p style="margin:0;font-family:${BODY_STACK};font-size:12px;line-height:1.7;color:#8892a6;">
                  Libra Colf &middot; Software per buste paga, contributi INPS e documenti del lavoro domestico.<br />
                  <a href="${SITE_URL}" style="color:#5f6b84;text-decoration:none;">${domain}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export const emailTemplatePreviews: EmailTemplatePreview[] = [
  {
    id: "subscription-welcome",
    label: "Benvenuto / abbonamento attivo",
    subject: "Benvenuto in Libra Colf — il tuo piano è attivo",
    preheader: "Il tuo abbonamento è confermato. Accedi ora e inizia a gestire il lavoro domestico.",
    ctaHref: APP_URL,
    html: renderEmailShell({
      preheader: "Il tuo abbonamento è confermato. Imposta la password e accedi alla piattaforma.",
      eyebrow: "Abbonamento attivo",
      title: "Benvenuto in Libra Colf.",
      intro: "Il tuo account è stato creato e il piano Piano Premium è attivo. Usa il link qui sotto per impostare la tua password e accedere.",
      bodyHtml: `
        <p style="margin:0 0 14px;">Ciao Mario,</p>
        <p style="margin:0 0 14px;">il tuo abbonamento è stato attivato e il tuo account su Libra Colf è pronto. Le credenziali di accesso sono state generate automaticamente con l'email che hai usato per il pagamento.</p>
        <p style="margin:0 0 14px;">Per accedere devi prima impostare la tua password usando il link qui sotto. Il link è valido per <strong>24 ore</strong>.</p>
        <p style="margin:0;">Se il link scade, puoi richiederne uno nuovo dalla pagina di accesso.</p>
      `,
      ctaLabel: "Imposta password e accedi",
      ctaHref: `${APP_URL}/auth/reset?token=MAGIC_LINK_TOKEN`,
      summaryItems: [
        { title: "Account", text: "mario.rossi@email.it" },
        { title: "Piano attivo", text: "Piano Premium — €19,90/mese" },
        { title: "Prossimo rinnovo", text: "4 giugno 2026" },
      ],
      footerNote: "Hai ricevuto questa email perché hai attivato un abbonamento Libra Colf. Il link di accesso è personale — non condividerlo. Per assistenza: supporto@libracolf.it.",
    }),
  },
  {
    id: "trial-started",
    label: "Prova gratuita iniziata",
    subject: "La tua prova gratuita di 30 giorni è iniziata",
    preheader: "Hai 30 giorni per esplorare Libra Colf senza vincoli. Nessun addebito fino al 4 giugno.",
    ctaHref: APP_URL,
    html: renderEmailShell({
      preheader: "Hai 30 giorni per esplorare Libra Colf senza vincoli. Nessun addebito fino al 4 giugno.",
      eyebrow: "Prova gratuita",
      title: "30 giorni per esplorare Libra Colf.",
      intro: "La tua prova è attiva. Puoi usare tutte le funzionalità del piano Piano Premium senza limitazioni — nessun addebito fino al 4 giugno 2026.",
      bodyHtml: `
        <p style="margin:0 0 14px;">Ciao Mario,</p>
        <p style="margin:0 0 14px;">la tua prova gratuita di <strong>30 giorni</strong> è ora attiva e il tuo account è pronto. Hai accesso completo al piano <strong>Piano Premium</strong>: contratti, buste paga, contributi INPS, scadenze e molto altro.</p>
        <p style="margin:0 0 14px;">Prima di accedere devi impostare la tua password usando il link qui sotto. Il link è valido per <strong>24 ore</strong>.</p>
        <p style="margin:0 0 14px;">Al termine del periodo di prova, il 4 giugno 2026, l'abbonamento si attiverà automaticamente a <strong>€19,90/mese</strong>. Puoi disdire in qualsiasi momento prima di quella data senza alcun costo.</p>
        <p style="margin:0;">Inizia adesso — il team è disponibile se hai domande.</p>
      `,
      ctaLabel: "Imposta password e accedi",
      ctaHref: `${APP_URL}/auth/reset?token=MAGIC_LINK_TOKEN`,
      summaryItems: [
        { title: "Piano in prova", text: "Piano Premium — accesso completo" },
        { title: "Scadenza prova", text: "4 giugno 2026" },
        { title: "Costo dopo la prova", text: "€19,90/mese — disdici prima della scadenza per non essere addebitato" },
      ],
      footerNote: "Hai ricevuto questa email perché hai attivato una prova gratuita di Libra Colf. Per disdire accedi al portale clienti o scrivi a supporto@libracolf.it.",
    }),
  },
  {
    id: "trial-expiring",
    label: "Prova in scadenza (3 giorni)",
    subject: "La tua prova Libra Colf scade tra 3 giorni",
    preheader: "Il 8 maggio inizia il tuo abbonamento a €19,90/mese. Disdici ora se cambi idea.",
    ctaHref: APP_URL,
    html: renderEmailShell({
      preheader: "Il 8 maggio inizia il tuo abbonamento a €19,90/mese. Disdici ora se cambi idea.",
      eyebrow: "Prova in scadenza",
      title: "La tua prova scade tra 3 giorni.",
      intro: "L'8 maggio 2026 la prova gratuita termina e il tuo abbonamento Piano Premium si attiverà a €19,90/mese. Nessuna azione richiesta se vuoi continuare.",
      bodyHtml: `
        <p style="margin:0 0 14px;">Ciao Mario,</p>
        <p style="margin:0 0 14px;">la tua prova gratuita di Libra Colf termina il <strong>8 maggio 2026</strong>. Da quella data verrà addebitato automaticamente <strong>€19,90/mese</strong> sul metodo di pagamento registrato.</p>
        <p style="margin:0 0 14px;">Se vuoi continuare non devi fare nulla — l'abbonamento si attiva in automatico e puoi gestirlo in qualsiasi momento dal portale clienti.</p>
        <p style="margin:0;">Se invece vuoi disdire, puoi farlo prima dell'8 maggio senza alcun costo.</p>
      `,
      ctaLabel: "Gestisci abbonamento",
      ctaHref: `${SITE_URL}/portale`,
      summaryItems: [
        { title: "Scadenza prova", text: "8 maggio 2026 — tra 3 giorni" },
        { title: "Addebito previsto", text: "€19,90/mese a partire dall'8 maggio" },
        { title: "Come disdire", text: `Accedi al portale clienti su ${SITE_URL} e annulla prima della scadenza.` },
      ],
      footerNote: "Questa email viene inviata automaticamente 3 giorni prima della fine del periodo di prova. Per assistenza scrivi a supporto@libracolf.it.",
    }),
  },
  {
    id: "payment-failed",
    label: "Pagamento fallito",
    subject: "Non siamo riusciti a rinnovare il tuo abbonamento",
    preheader: "Il pagamento di €19,90 non è andato a buon fine. Aggiorna il metodo di pagamento per non perdere l'accesso.",
    ctaHref: `${SITE_URL}/portale`,
    html: renderEmailShell({
      preheader: "Il pagamento di €19,90 non è andato a buon fine. Aggiorna il metodo di pagamento per non perdere l'accesso.",
      eyebrow: "Pagamento non riuscito",
      title: "Non siamo riusciti ad addebitare il rinnovo.",
      intro: "Il pagamento di €19,90 per il rinnovo del tuo piano Piano Premium non è andato a buon fine. Aggiorna il metodo di pagamento per mantenere l'accesso.",
      bodyHtml: `
        <p style="margin:0 0 14px;">Ciao Mario,</p>
        <p style="margin:0 0 14px;">il tentativo di addebito di <strong>€19,90</strong> per il rinnovo del piano <strong>Piano Premium</strong> non è andato a buon fine. Il tuo accesso a Libra Colf è temporaneamente sospeso.</p>
        <p style="margin:0 0 14px;">Per ripristinarlo, aggiorna il metodo di pagamento nel portale clienti. Effettueremo un nuovo tentativo di addebito automaticamente.</p>
        <p style="margin:0;">Se non viene aggiornato entro 7 giorni, l'abbonamento verrà cancellato e perderai l'accesso ai dati.</p>
      `,
      ctaLabel: "Aggiorna metodo di pagamento",
      ctaHref: `${SITE_URL}/portale`,
      summaryItems: [
        { title: "Importo non addebitato", text: "€19,90 — rinnovo Piano Premium" },
        { title: "Data tentativo", text: "5 maggio 2026" },
        { title: "Prossimo tentativo automatico", text: "8 maggio 2026 — aggiorna la carta prima di allora" },
      ],
      footerNote: "Se ritieni che si tratti di un errore, contatta la tua banca o scrivi a supporto@libracolf.it. Non verranno effettuati addebiti non autorizzati.",
    }),
  },
  {
    id: "subscription-cancelled",
    label: "Abbonamento disdetto",
    subject: "Il tuo abbonamento Libra Colf è stato disdetto",
    preheader: "L'accesso rimane attivo fino al 4 giugno 2026. Puoi riattivare in qualsiasi momento.",
    ctaHref: SITE_URL,
    html: renderEmailShell({
      preheader: "L'accesso rimane attivo fino al 4 giugno 2026. Puoi riattivare in qualsiasi momento.",
      eyebrow: "Abbonamento disdetto",
      title: "Abbonamento cancellato.",
      intro: "La disdetta è confermata. Il tuo accesso a Libra Colf rimane attivo fino al termine del periodo già pagato: 4 giugno 2026.",
      bodyHtml: `
        <p style="margin:0 0 14px;">Ciao Mario,</p>
        <p style="margin:0 0 14px;">abbiamo registrato la disdetta del tuo piano <strong>Piano Premium</strong>. Nessun ulteriore addebito verrà effettuato.</p>
        <p style="margin:0 0 14px;">Puoi continuare a usare Libra Colf fino al <strong>4 giugno 2026</strong>, data in cui l'accesso verrà disattivato. I tuoi dati verranno conservati per 30 giorni dopo la disattivazione.</p>
        <p style="margin:0;">Se hai disdetto per errore o cambi idea, puoi riattivare il piano in qualsiasi momento dal portale clienti.</p>
      `,
      ctaLabel: "Riattiva abbonamento",
      ctaHref: `${SITE_URL}/#prezzi`,
      summaryItems: [
        { title: "Accesso attivo fino a", text: "4 giugno 2026" },
        { title: "Ulteriori addebiti", text: "Nessuno — disdetta confermata" },
        { title: "Dati", text: "Conservati per 30 giorni dalla disattivazione, poi eliminati definitivamente." },
      ],
      footerNote: "Se non hai richiesto tu la disdetta, contatta immediatamente il supporto a supporto@libracolf.it.",
    }),
  },
];
