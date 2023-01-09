export function download(url: string): void;
export function download(blob: Blob, fileName: string): void;
export function download(data: string | Blob, fileName?: string) {
  if (typeof data === "string") return downloadFromUrl(data);

  if (fileName) return downloadFromBlob(data, fileName);

  throw new Error("");
}

async function downloadFromUrl(url: string) {
  const endUrl = url.split("/").at(-1);

  if (!endUrl) throw new Error(""); // TODO

  const fileName = endUrl.split("?")[0];

  const res = await fetch(url, {
    headers: {
      responseType: "blob",
    },
  });
  const blob = await res.blob();
  downloadFromBlob(blob, fileName);
}

function downloadFromBlob(blob: Blob, fileName: string) {
  const anchor = document.createElement("a");
  const href = URL.createObjectURL(blob);
  anchor.href = href;
  anchor.setAttribute("download", fileName);
  anchor.setAttribute("target", "_blank");
  anchor.click();
  URL.revokeObjectURL(href);
}
