import React, { useEffect, useState } from "react";
import { ImageSlides } from "./ImageSlides";

const PagePreviewContent = ({ slides = [], editors = [], title = "" }) => {
  const [previewData, setPreviewData] = useState({
    slides: [],
    editors: [],
    title: ""
  });

  useEffect(() => {
    // Get data from sessionStorage
    const savedSlides = JSON.parse(sessionStorage.getItem("slides") || "[]");
    const savedContents = JSON.parse(sessionStorage.getItem("contents") || "[]");
    const savedTitle = sessionStorage.getItem("mainText") || "";

    setPreviewData({
      slides: savedSlides,
      editors: savedContents,
      title: savedTitle
    });
  }, []);

  return (
    <div className="relative p-6">
      {/* Page Title */}
      {previewData.title && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{previewData.title}</h1>
        </div>
      )}

      {/* Hero Slides Section */}
      {previewData.slides && previewData.slides.length > 0 && previewData.slides.some((slide) => slide.image || slide.title) && (
        <div className="mb-8">
          <ImageSlides
            showLink={false}
            savedSlides={previewData.slides.map((slide) => ({
              title: slide.title || "",
              content: slide.content || "",
              image: slide.image || "",
              link: slide.link || "",
              fileType: slide.fileType || "image",
            }))}
          />
        </div>
      )}

      {/* Content Sections */}
      {previewData.editors && previewData.editors.length > 0 && (
        <div className="space-y-8">
          {previewData.editors.map((editor, index) => (
            <div key={editor.id || index} className="bg-white rounded-lg">
              {editor.title && editor.title !== "Main Content" && (
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{editor.title}</h2>
              )}
              {editor.content && (
                <div className="prose max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: editor.content }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {(!previewData.slides || !previewData.slides.length || !previewData.slides.some((slide) => slide.image || slide.title)) &&
        (!previewData.editors || !previewData.editors.length || !previewData.editors.some((editor) => editor.content)) && (
          <div className="text-center py-16">
            <div className="text-gray-500">
              <h3 className="text-xl font-medium mb-2">No Content to Preview</h3>
              <p>Add some slides or content to see the preview</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default PagePreviewContent;
