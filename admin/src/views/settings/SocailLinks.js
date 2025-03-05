import React, { useState } from "react";
import { BsGear } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Modal from "react-modal";
import facebook from "../../assets/facebook.png";
import linkedn from "../../assets/linkedn.png";
import instagram from "../../assets/insta.png";

const SocialLinks = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSocial, setNewSocial] = useState({
    name: "",
    link: "",
    icon: null,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    link: "",
    icon: null,
  });
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const Items = (event, index) => {
    setDragging(index);
  };

  const handleDragOver = (event, index) => {
    setDragOver(index);
  };

  const handleDragEnd = (event) => {
    if (dragging !== null && dragOver !== null) {
      const newSocialLinks = [...socialLinks];
      const [reorderedItem] = newSocialLinks.splice(dragging, 1);
      newSocialLinks.splice(dragOver, 0, reorderedItem);
      setSocialLinks(newSocialLinks);
    }
    setDragging(null);
    setDragOver(null);
  };

  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "linkedin", icon: linkedn, isActive: true },
    { id: 2, platform: "facebook", icon: facebook, isActive: true },
    { id: 3, platform: "instagram", icon: instagram, isActive: true },
  ]);

  const handleEdit = (social) => {
    setSelectedSocial(social);
    setEditForm({
      name: social.platform,
      link: social.link || "",
      icon: social.icon,
    });
    setIsEditModalOpen(true);
    setOpenSettingsId(null);
  };

  const handleRemove = (social) => {
    setSelectedSocial(social);
    setIsRemoveModalOpen(true);
    setOpenSettingsId(null);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewSocial({ ...newSocial, icon: imageUrl });
    }
  };

  const handleEditImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditForm({ ...editForm, icon: imageUrl });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Social Links</h2>
        <button
          className="px-6 py-2 bg-primary text-white rounded-lg"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Socials
        </button>
      </div>

      <div className="space-y-4">
        {socialLinks.map((social, index) => (
          <div
            key={social.id}
            draggable={true}
            onDragStart={(e) => Items(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className="flex items-center cursor-pointer justify-between p-4 bg-white rounded-lg border"
          >
            <div className="flex items-center gap-8">
              <span className="text-gray-500">{social.id}</span>
              <img src={social.icon} alt={social.platform} className="h-12" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded text-[32px]">
                  ↑
                </button>
                <button className="p-2 hover:bg-gray-100 rounded text-[32px]">
                  ↓
                </button>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={social.isActive}
                onChange={() => {
                  setSocialLinks(
                    socialLinks.map((link) =>
                      link.id === social.id
                        ? { ...link, isActive: !link.isActive }
                        : link
                    )
                  );
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => {
                setOpenSettingsId(
                  openSettingsId === social.id ? null : social.id
                );
              }}
            >
              <FiSettings size={20} />
            </button>
            {openSettingsId === social.id && (
              <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  onClick={() => handleEdit(social)}
                >
                  Edit
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                  onClick={() => handleRemove(social)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Add Social Link</h2>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Icon Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 flex items-center justify-center">
                {newSocial.icon ? (
                  <img
                    src={newSocial.icon}
                    alt="Social Icon"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-8xl font-bold">X</div>
                )}
              </div>
              <input
                type="file"
                id="socialIcon"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <label
                htmlFor="socialIcon"
                className="text-primary cursor-pointer"
              >
                Click to Add icon
              </label>
            </div>

            <div>
              <label className="block mb-2">Social Name</label>
              <input
                type="text"
                placeholder="Name"
                value={newSocial.name}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Social Link</label>
              <input
                type="text"
                placeholder="Url or link"
                value={newSocial.link}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, link: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={() => {
                  // Add your logic to save the new social link
                  setIsAddModalOpen(false);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit Social Info</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Icon Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 flex items-center justify-center">
                {editForm.icon ? (
                  <img
                    src={editForm.icon}
                    alt="Social Icon"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-8xl font-bold">X</div>
                )}
              </div>
              <input
                type="file"
                id="editSocialIcon"
                accept="image/*"
                className="hidden"
                onChange={handleEditImageSelect}
              />
              <label
                htmlFor="editSocialIcon"
                className="text-primary cursor-pointer"
              >
                Click to Add icon
              </label>
            </div>

            <div>
              <label className="block mb-2">Social Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="X (Formerly Twitter)"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Social Link</label>
              <input
                type="text"
                value={editForm.link}
                onChange={(e) =>
                  setEditForm({ ...editForm, link: e.target.value })
                }
                placeholder="www.x.com/hermandai/profile"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Remove Social Link
            </h2>
            <button
              onClick={() => setIsRemoveModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to remove this social link?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRemoveModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSocialLinks(
                    socialLinks.filter((link) => link.id !== selectedSocial.id)
                  );
                  setIsRemoveModalOpen(false);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SocialLinks;
