import React from "react";
import { ImageSlides } from "./ImageSlides";

const PagePreviewContent = ({ slides, editors, title }) => {
  return (
    <div className="relative p-6">
      {/* Page Title */}
      {title && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
      )}

      {/* Hero Slides Section */}
      {slides.length > 0 && slides.some((slide) => slide.image || slide.title) && (
        <div className="mb-8">
          <ImageSlides
            showLink={false}
            savedSlides={slides.map((slide) => ({
              title: slide.title,
              content: "",
              image: slide.image,
              link: slide.link,
              fileType: slide.fileType,
            }))}
          />
        </div>
      )}

      {/* Content Sections */}
      {editors.length > 0 && (
        <div className="space-y-8">
          {editors.map((editor, index) => (
            <div key={editor.id} className="bg-white rounded-lg">
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
      {(!slides.length || !slides.some((slide) => slide.image || slide.title)) &&
        (!editors.length || !editors.some((editor) => editor.content)) && (
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
