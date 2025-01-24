const o = (e) =>
    e.map(
      (t) =>
        t.Username +
        ` [${t.DateTime}]
  ` +
        t.MessageData
    ).join(`
  
  `),
  n = (e) => {
    const t = new Blob([o(e)], { type: "text/plain" }),
      a = document.createElement("a");
    (a.href = URL.createObjectURL(t)),
      (a.download = "chat-history.txt"),
      a.click();
  };
export { n as e };
