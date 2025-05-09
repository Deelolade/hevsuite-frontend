import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews, createNews, updateNews, deleteNews, reset } from "../../store/news/newsSlice";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaEye, FaRegNewspaper, FaRegClock, FaUsers } from "react-icons/fa";
import Modal from 'react-modal';
import { BiSearch } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import Profile from "../../components/Profile";
import { Editor } from '@tinymce/tinymce-react';

const News = () => {

  console.log('Initial Redux State:', {
    getAllNews,
    createNews,
    updateNews,
    deleteNews,

    reset,
  });
  const dispatch = useDispatch();
  // const { news = [], isLoading = false, isError = false, message = "" } = useSelector((state) => state.news || {});
  const { news = [], isLoading = false, isError = false, message = "" } = useSelector((state) => state.news);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [isEditNewsOpen, setIsEditNewsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [addNewsImages, setAddNewsImages] = useState([]);
  const [editNewsImages, setEditNewsImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    expireDate: "",
    audienceType: "all",
    description: "",
    isOnLandingPage: false,
    isSpotlightNews: false,
  });

  // Filter news based on search term
  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getAllNews());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    const newsFormData = new FormData();
    
    // Append form data
    newsFormData.append("title", formData.title);
    newsFormData.append("expireDate", formData.expireDate);
    newsFormData.append("audienceType", formData.audienceType);
    newsFormData.append("description", formData.description);
    newsFormData.append("isOnLandingPage", formData.isOnLandingPage);
    newsFormData.append("isSpotlightNews", formData.isSpotlightNews);
    
    // Append images if any
    if (addNewsImages.length > 0) {
      addNewsImages.forEach((image) => {
        newsFormData.append("images", image);
      });
    }

    try {
      await dispatch(createNews(newsFormData)).unwrap();
      setIsAddNewsOpen(false);
      setAddNewsImages([]);
      setFormData({
        title: "",
        expireDate: "",
        audienceType: "all",
        description: "",
        isOnLandingPage: false,
        isSpotlightNews: false,
      });
      toast.success("News created successfully!");
    } catch (error) {
      console.error("Error creating news:", error);
      toast.error("Failed to create news");
    }
  };

  const handleEditClick = (newsItem) => {
    setSelectedNews(newsItem);
    setFormData({
      title: newsItem.title,
      expireDate: new Date(newsItem.expireDate).toISOString().split('T')[0],
      audienceType: newsItem.audienceType,
      description: newsItem.description,
      isOnLandingPage: newsItem.isOnLandingPage,
      isSpotlightNews: newsItem.isSpotlightNews,
    });
    setEditNewsImages([]);
    setIsEditNewsOpen(true);
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    if (!selectedNews) return;

    const newsFormData = new FormData();
    
    // Append form data
    newsFormData.append("title", formData.title);
    newsFormData.append("expireDate", formData.expireDate);
    newsFormData.append("audienceType", formData.audienceType);
    newsFormData.append("description", formData.description);
    newsFormData.append("isOnLandingPage", formData.isOnLandingPage);
    newsFormData.append("isSpotlightNews", formData.isSpotlightNews);
    
    // Append new images if any
    if (editNewsImages.length > 0) {
      editNewsImages.forEach((image) => {
        newsFormData.append("images", image);
      });
    }

    try {
      await dispatch(updateNews({ id: selectedNews._id, formData: newsFormData })).unwrap();
      setIsEditNewsOpen(false);
      setSelectedNews(null);
      setEditNewsImages([]);
      setFormData({
        title: "",
        expireDate: "",
        audienceType: "all",
        description: "",
        isOnLandingPage: false,
        isSpotlightNews: false,
      });
      toast.success("News updated successfully!");
    } catch (error) {
      console.error("Error updating news:", error);
      toast.error("Failed to update news");
    }
  };

  const handleDeleteClick = (newsItem) => {
    setSelectedNews(newsItem);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedNews) return;

    try {
      const result = await dispatch(deleteNews(selectedNews._id)).unwrap();
      if (result.id) {
        setIsDeleteModalOpen(false);
        setSelectedNews(null);
        toast.success("News deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news");
    }
  };

  const handleDetailClick = (newsItem) => {
    setSelectedNews(newsItem);
    setIsDetailModalOpen(true);
  };

  const getAudienceTypeColor = (type) => {
    switch (type) {
      case 'member':
        return 'bg-blue-100 text-blue-800';
      case 'all':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
  return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search news by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
        </div>
        <Profile />
      </div>

      <div className="flex justify-between flex-col md:flex-row gap-2 items-center">
        <button
          className="px-6 py-2.5 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
          onClick={() => setIsAddNewsOpen(true)}
        >
          <FaRegNewspaper />
          Create News
          <span className="text-xl">+</span>
        </button>
        <div className="text-sm text-gray-500">
          Total News: {news.length}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="relative h-48">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <FaRegNewspaper className="text-4xl text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDetailClick(item)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                      title="View Details"
                    >
                      <FaEye className="text-primary" />
                    </button>
              <button
                      onClick={() => handleEditClick(item)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                      title="Edit News"
                    >
                      <FaEdit className="text-blue-500" />
              </button>
              <button
                      onClick={() => handleDeleteClick(item)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                      title="Delete News"
                    >
                      <FaTrash className="text-red-500" />
              </button>
            </div>
                    </div>
                    </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAudienceTypeColor(item.audienceType)}`}>
                    {item.audienceType.charAt(0).toUpperCase() + item.audienceType.slice(1)}
                  </span>
                  {item.isSpotlightNews && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Spotlight
                    </span>
                  )}
                    </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
                <div 
                  className="text-gray-600 mb-4 line-clamp-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                  }}
                />
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaRegClock className="text-gray-400" />
                    <span>Expires: {formatDate(item.expireDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-gray-400" />
                    <span>{item.readCount || 0} reads</span>
                </div>
              </div>
            </div>
          </div>
          ))
        ) : (
          <div className="col-span-3 bg-white rounded-lg p-8 text-center">
            <FaRegNewspaper className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm ? "No news found matching your search" : "No news available"}
            </p>
      </div>
        )}
      </div>

      {/* Add News Modal */}
      <Modal
        isOpen={isAddNewsOpen}
        onRequestClose={() => setIsAddNewsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[600px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add News</h2>
            <button
              onClick={() => setIsAddNewsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          <form onSubmit={handleCreateNews} className="space-y-4">
            {/* News Title */}
            <div>
              <label className="block mb-1">News Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter news title"
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
                required
              />
            </div>

            {/* Expire Date and Audience Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Expire Date</label>
                  <input
                  type="date"
                  name="expireDate"
                  value={formData.expireDate}
                  onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  required
                  />
              </div>
              <div>
                <label className="block mb-1">Audience Type</label>
                <select
                  name="audienceType"
                  value={formData.audienceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg text-gray-600 appearance-none bg-white"
                >
                  <option value="all">All</option>
                  <option value="member">Member</option>
                </select>
              </div>
            </div>

            {/* News Description */}
            <div>
              <label className="block mb-1">News Description</label>
              <Editor
                apiKey="5rrbe6o39esv7yoo8tm6cs0j2htx7cz0h4rtj6amuwwxweii" // You'll need to get this from TinyMCE
                value={formData.description}
                onEditorChange={handleEditorChange}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isOnLandingPage"
                  checked={formData.isOnLandingPage}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span>Post on Landing Page</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isSpotlightNews"
                  checked={formData.isSpotlightNews}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span>Spotlight News</span>
              </label>
            </div>

            {/* News Images */}
            <div>
              <label className="block mb-1">News Images</label>
              <div className="flex gap-4 flex-wrap">
                <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-2xl text-gray-400">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setAddNewsImages((prev) => [...prev, file]);
                      }
                    }}
                    multiple
                  />
                </label>
                {addNewsImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-lg overflow-hidden relative group"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setAddNewsImages((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsAddNewsOpen(false);
                  setAddNewsImages([]);
                }}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
              >
                Add News
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Edit News Modal */}
      <Modal
        isOpen={isEditNewsOpen}
        onRequestClose={() => setIsEditNewsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[600px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit News</h2>
            <button
              onClick={() => setIsEditNewsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          <form onSubmit={handleUpdateNews} className="space-y-4">
              {/* News Title */}
              <div>
                <label className="block mb-1">News Title</label>
                <input
                  type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter news title"
                  className="w-full px-4 py-2 border rounded-lg text-gray-600"
                required
                />
              </div>

              {/* Expire Date and Audience Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Expire Date</label>
                    <input
                  type="date"
                  name="expireDate"
                  value={formData.expireDate}
                  onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  required
                    />
                </div>
                <div>
                  <label className="block mb-1">Audience Type</label>
                  <select
                  name="audienceType"
                  value={formData.audienceType}
                  onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-600 appearance-none bg-white"
                  >
                    <option value="all">All</option>
                  <option value="member">Member</option>
                  </select>
                </div>
              </div>

              {/* News Description */}
              <div>
                <label className="block mb-1">News Description</label>
              <Editor
                apiKey="your-tinymce-api-key" // You'll need to get this from TinyMCE
                value={formData.description}
                onEditorChange={handleEditorChange}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                  name="isOnLandingPage"
                  checked={formData.isOnLandingPage}
                  onChange={handleInputChange}
                    className="rounded"
                  />
                  <span>Post on Landing Page</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                  name="isSpotlightNews"
                  checked={formData.isSpotlightNews}
                  onChange={handleInputChange}
                    className="rounded"
                  />
                  <span>Spotlight News</span>
                </label>
              </div>

            {/* News Images */}
              <div>
              <label className="block mb-1">News Images</label>
                <div className="flex gap-4 flex-wrap">
                {selectedNews?.images?.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-lg overflow-hidden relative group"
                  >
                    <img
                      src={imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                  <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl text-gray-400">+</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                        setEditNewsImages((prev) => [...prev, file]);
                        }
                      }}
                    multiple
                    />
                  </label>
                  {editNewsImages.map((image, index) => (
                    <div
                    key={`new-${index}`}
                      className="w-24 h-24 rounded-lg overflow-hidden relative group"
                    >
                      <img
                      src={URL.createObjectURL(image)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                      type="button"
                        onClick={() => {
                          setEditNewsImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                type="button"
                  onClick={() => {
                    setIsEditNewsOpen(false);
                    setEditNewsImages([]);
                  }}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
              >
                Update News
                </button>
              </div>
          </form>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={() => setIsDetailModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[800px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        {selectedNews && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{selectedNews.title}</h2>
            <button
                onClick={() => setIsDetailModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

            <div className="space-y-6">
              {/* Images Carousel */}
              {selectedNews.images && selectedNews.images.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {selectedNews.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedNews.title} - ${index + 1}`}
                      className="w-64 h-48 object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FaRegNewspaper className="text-6xl text-gray-400" />
              </div>
              )}

              {/* News Details */}
              <div className="grid md:grid-cols-2 gap-6">
              <div>
                  <h3 className="font-semibold mb-2">Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAudienceTypeColor(selectedNews.audienceType)}`}>
                        {selectedNews.audienceType.charAt(0).toUpperCase() + selectedNews.audienceType.slice(1)}
                      </span>
                      {selectedNews.isSpotlightNews && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          Spotlight
                        </span>
                      )}
                      {selectedNews.isOnLandingPage && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                          Landing Page
                        </span>
                      )}
                </div>
                    <p className="text-gray-600">
                      <span className="font-medium">Created:</span>{" "}
                      {formatDate(selectedNews.createdAt)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Expires:</span>{" "}
                      {formatDate(selectedNews.expireDate)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Reads:</span>{" "}
                      {selectedNews.readCount || 0}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <div 
                    className="text-gray-600 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedNews.description }}
                      />
                    </div>
                </div>
              </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  handleEditClick(selectedNews);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Edit News
                </button>
              </div>
            </div>
          )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[400px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Delete News</h2>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "{selectedNews?.title}"? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">
                <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
              onClick={handleDeleteConfirm}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
              </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default News;
