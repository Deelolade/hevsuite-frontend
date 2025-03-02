import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import Modal from "react-modal";
import EditMenu from "./EditMenu";
import AddPage from "./AddPage";
import EditMenuItem from "../../components/modals/cms/menu/EditMenuItem";

// Add new state
const Menus = () => {
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [currentPage, setCurrentPage] = useState(2);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [menuTitle, setMenuTitle] = useState("");
  const [menuLink, setMenuLink] = useState("");
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // const sensors = useSensors(
  //   useSensor(MouseSensor),
  //   useSensor(TouchSensor),
  //   useSensor(KeyboardSensor)
  // );

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;

  //   if (active.id !== over.id) {
  //     // Reorder menus
  //     const newMenus = [...menus];
  //     const activeIndex = newMenus.findIndex((menu) => menu.id === active.id);
  //     const overIndex = newMenus.findIndex((menu) => menu.id === over.id);

  //     newMenus.splice(overIndex, 0, newMenus.splice(activeIndex, 1)[0]);
  //     setMenus(newMenus);
  //   }
  // };

  const [menus, setMenus] = useState([
    { id: 1, name: "Menu 1" },
    { id: 2, name: "Menu 2" },
    { id: 3, name: "Menu 3" },
    { id: 4, name: "Menu 4" },
  ]);
  const [menuItems, setMenuItems] = useState([
    { id: 1, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 2, title: "Terms and Condition", visibility: false, owner: "System" },
    { id: 3, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 4, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 5, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 6, title: "Terms and Condition", visibility: false, owner: "System" },
  ]);

  const handleVisibility = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, visibility: !item.visibility } : item
      )
    );
  };

  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const handleDragStart = (event, index) => {
    setDragging(index);
  };

  const handleDragOver = (event, index) => {
    setDragOver(index);
  };

  const handleDragEnd = (event) => {
    if (dragging !== null && dragOver !== null) {
      const newMenus = [...menus];
      const [reorderedItem] = newMenus.splice(dragging, 1);
      newMenus.splice(dragOver, 0, reorderedItem);
      setMenus(newMenus);
    }
    setDragging(null);
    setDragOver(null);
  };

  const [draggingItems, setDraggingItems] = useState(null);
  const [dragOverItems, setDragOverItems] = useState(null);

  const handleDragItemsStart = (event, index) => {
    setDraggingItems(index);
  };

  const handleDragItemsOver = (event, index) => {
    setDragOverItems(index);
  };

  const handleDragItemsEnd = (event) => {
    if (draggingItems !== null && dragOverItems !== null) {
      const newMenuItems = [...menuItems];
      const [reorderedItem] = newMenuItems.splice(draggingItems, 1);
      newMenuItems.splice(dragOverItems, 0, reorderedItem);
      setMenuItems(newMenuItems);
    }
    setDraggingItems(null);
    setDragOverItems(null);
  };
  return (
    <div className="space-y-6">
      {/* Controls */}
      {showAddPage ? (
        <AddPage onBack={() => setShowAddPage(false)} />
      ) : (
        <>
          <div className="flex justify-end items-center gap-2">
            <select className="px-4 py-2 border rounded-lg text-gray-600 min-w-[200px]">
              <option>Active</option>
              <option>Deleted</option>
            </select>
            <div className="flex gap-3">
              <button
                className="px-6 py-2 border rounded-lg"
                onClick={() => setIsEditMenuOpen(true)}
              >
                Edit Menu
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg"
                onClick={() => setIsAddMenuOpen(true)}
              >
                Add Menu
              </button>

              <Modal
                isOpen={isAddMenuOpen}
                onRequestClose={() => setIsAddMenuOpen(false)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
                overlayClassName="fixed inset-0 bg-black/50"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add Menu</h2>
                    <button
                      onClick={() => setIsAddMenuOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Menu Title */}
                    <div>
                      <label className="block text-sm mb-2">Menu Title</label>
                      <input
                        type="text"
                        value={menuTitle}
                        onChange={(e) => setMenuTitle(e.target.value)}
                        placeholder="Menu Title"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>

                    {/* Link */}
                    <div>
                      <label className="block text-sm mb-2">
                        Link (available)
                      </label>
                      <input
                        type="text"
                        value={menuLink}
                        onChange={(e) => setMenuLink(e.target.value)}
                        placeholder="Enter link/url"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>

                    {/* Visibility and Pages */}
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="block text-sm mb-2">Visibility</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={menuVisibility}
                            onChange={(e) =>
                              setMenuVisibility(e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">
                          Add Menu Pages
                        </label>
                        <button className="px-4 py-2 border rounded-lg text-sm w-full flex justify-between items-center">
                          Select Pages
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        onClick={() => setIsAddMenuOpen(false)}
                        className="px-6 py-2 border rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // Handle save changes
                          setIsAddMenuOpen(false);
                        }}
                        className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>

          {/* Menu Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button className="text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-4">
              {menus.map((menu, index) => (
                <button
                  key={menu.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`px-6 py-2 rounded-lg flex w-40 h-16 justify-between items-center gap-2 ${
                    selectedMenu === menu.id
                      ? "bg-primary text-white"
                      : "border text-gray-600"
                  }`}
                  onClick={() => setSelectedMenu(menu.id)}
                >
                  {menu.name}
                  <div className="flex flex-col gap-1 ">
                    <BsArrowLeft size={20} />
                    <BsArrowRight size={20} />
                  </div>
                </button>
              ))}
            </div>

            <button className="text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg"
              onClick={() => setShowAddPage(true)}
            >
              Add New Page
            </button>
          </div>
          {/* <div className="bg-white rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Page Title
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Visibility
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Owner
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 px-6 flex items-center gap-2">
                      <span className="p-1 border rounded">⋮⋮</span>
                      {item.title}
                    </td>
                    <td className="py-4 px-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.visibility}
                          className="sr-only peer"
                          onChange={() => handleVisibility(item.id)}
                        />
                        <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {item.owner}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-4">
                        <button
                          className="text-primary"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditItemModalOpen(true);
                          }}
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          className="text-primary"
                          onClick={() => setIsRemoveModalOpen(true)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}

          <div className="bg-white rounded-lg">
            <div className="flex flex-col">
              <div className="flex justify-between items-center py-4 px-6">
                <span className="text-sm font-medium">Page Title</span>
                <span className="text-sm font-medium">Visibility</span>
                <span className="text-sm font-medium">Owner</span>
                <span className="text-sm font-medium">Action</span>
              </div>
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  draggable={true}
                  onDragStart={(e) => handleDragItemsStart(e, index)}
                  onDragOver={(e) => handleDragItemsOver(e, index)}
                  onDragEnd={handleDragItemsEnd}
                  className="flex items-center justify-between py-4 px-6 border-b cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1 border rounded">⋮⋮</span>
                    {item.title}
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.visibility}
                        className="sr-only peer"
                        onChange={() => handleVisibility(item.id)}
                      />
                      <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <span className="text-sm text-gray-600">{item.owner}</span>
                    <div className="flex gap-4">
                      <button
                        className="text-primary"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsEditItemModalOpen(true);
                        }}
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="text-primary"
                        onClick={() => setIsRemoveModalOpen(true)}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div>
              Show result:
              <select className="ml-2 px-2 py-1 border rounded">
                <option>6</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {[1, 2, 3, 4, "...", 20].map((page, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                    currentPage === page
                      ? "bg-green-800 text-white"
                      : "text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-1 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <Modal
            isOpen={isEditMenuOpen}
            onRequestClose={() => setIsEditMenuOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <EditMenu
              setIsEditMenuOpen={setIsEditMenuOpen}
              setMenuVisibility={setMenuVisibility}
              menuVisibility={menuVisibility}
            />
          </Modal>

          <Modal
            isOpen={isRemoveModalOpen}
            onRequestClose={() => setIsRemoveModalOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-xl">⚠</span>
                  <h2 className="text-xl font-semibold">Remove Content</h2>
                </div>
                <button
                  onClick={() => setIsRemoveModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-gray-600">
                  Are you sure you want to remove this content? Removing this
                  content will permanently erase it from the website when saved.
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setIsRemoveModalOpen(false)}
                    className="px-6 py-2 border rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle remove
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
          <Modal
            isOpen={isEditItemModalOpen}
            onRequestClose={() => setIsEditItemModalOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <EditMenuItem
              setIsEditItemModalOpen={setIsEditItemModalOpen}
              selectedItem={selectedItem}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Menus;
