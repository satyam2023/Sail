import { CMSRoot } from "models/ApiResponses/CMSPageResponse";

export const FilterContent = (Data: [], id: number) => {
  const ContentOutput = Data.filter(handleContentFilter);
  function handleContentFilter(item: CMSRoot) {
    return item.id == id;
  }

  return ContentOutput[0]?.content;
};
