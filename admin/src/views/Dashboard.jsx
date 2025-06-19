import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BsPeople,
  BsClock,
  BsThreeDotsVertical,
  BsChevronDown,
} from 'react-icons/bs';
import { FaUserTimes } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import Profile from '../components/Profile';
import { BiSearch } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import Modal from 'react-modal';
import avat from '../assets/defualtuser.webp';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Chart from 'react-apexcharts';
import { showModal } from '../components/FireModal';
import eventService from '../store/events/eventService';
import userService from '../store/users/userService';
import { getDashboardStats } from '../store/statistics/statisticsSlice';

const MySwal = withReactContent(Swal);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [addEventImages, setAddEventImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const { dashboardStats = {}, isLoading: statsLoading = false } = useSelector((state) => state.statistics || {});
  const [eventTime, setEventTime] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [eventDescription, setEventDescription] = useState('');
  const [audienceType, setAudienceType] = useState('all');
  const [price, setPrice] = useState('');
  const [noOfTickets, setNoOfTickets] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  const [files, setFiles] = useState([]);
  const [removedFiles, setRemovedFiles] = useState([]);

  // Generate year options for the dropdown
  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return year.toString();
  });

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  // Process data for charts based on filtered users
  const processChartData = (data) => {
    console.log('Processing chart data:', JSON.stringify(data, null, 2));
    if (!data) return { monthlyData: Array(12).fill(0), eventTypeDistribution: [] };

    // Process monthly users data
    const monthlyData = Array(12).fill(0);
    if (data.monthlyUsers && Array.isArray(data.monthlyUsers)) {
      // First, group data by month across all years
      const monthlyTotals = {};
      
      data.monthlyUsers.forEach(item => {
        if (item && typeof item._id.month === 'number') {
          const month = item._id.month;
          if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
          }

          if (!statusFilter || statusFilter === '') {
            // For "All Status", sum all statuses
            const totalCount = item.statusCounts.reduce((sum, status) => sum + status.count, 0);
            monthlyTotals[month] += totalCount;
            console.log(`Month ${month} (${item._id.year}) adding ${totalCount} users (all statuses)`);
          } else {
            // For specific status, find matching status count
            const statusCount = item.statusCounts.find(s => 
              s.status.toLowerCase() === statusFilter.toLowerCase()
            );
            const count = statusCount ? statusCount.count : 0;
            monthlyTotals[month] += count;
            console.log(`Month ${month} (${item._id.year}) adding ${count} users (status: ${statusFilter})`);
          }
        }
      });

      // Fill the monthlyData array with the totals
      Object.entries(monthlyTotals).forEach(([month, total]) => {
        monthlyData[parseInt(month) - 1] = total;
      });
    }

    // Process event type distribution
    const eventTypeDistribution = Array.isArray(data.eventTypeDistribution) 
      ? data.eventTypeDistribution 
      : [];

    console.log('Processed monthly data:', monthlyData);
    console.log('Processed event type distribution:', eventTypeDistribution);

    return {
      monthlyData,
      eventTypeDistribution
    };
  };

  // Filter dashboard data based on status and year
  useEffect(() => {
    console.log('Dashboard stats:', dashboardStats);
    if (dashboardStats) {
      let filtered = { ...dashboardStats };
      
      // Apply year filter only if a specific year is selected
      if (yearFilter && yearFilter !== 'all') {
        if (filtered.monthlyUsers && Array.isArray(filtered.monthlyUsers)) {
          const selectedYear = parseInt(yearFilter);
          console.log('Filtering for year:', selectedYear);
          filtered.monthlyUsers = filtered.monthlyUsers.filter(user => {
            const yearMatch = user._id.year === selectedYear;
            console.log(`Month ${user._id.month}, Year ${user._id.year}, Match: ${yearMatch}`);
            return yearMatch;
          });
        }
      }
      
      console.log('Filtered dashboard data:', filtered);
      setDashboardData(filtered);
    }
  }, [dashboardStats, yearFilter]);

  // Update chart data based on filtered dashboard data
  const chartData = processChartData(dashboardData || dashboardStats);

  const handleRemoveImage = (index) => {
    // Mark file as removed
    setRemovedFiles((prev) => [...prev, files[index].name]);

    // Update UI state
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setAddEventImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      const previewUrls = newFiles.map((file) => URL.createObjectURL(file));
      setAddEventImages((prev) => [...prev, ...previewUrls]);
    }
  };

  const handleEventCreate = async () => {
    const formData = new FormData();

    // 1. Append regular form data
    formData.append('name', eventName);
    formData.append('location', eventLocation);
    formData.append('time', eventTime);
    formData.append('description', eventDescription);
    formData.append('audienceType', audienceType);
    formData.append('price', price);
    formData.append('numberOfTicket', noOfTickets);
    formData.append('invitedUsers', JSON.stringify(selectedUsers));

    // Filter out removed files
    const filesToUpload = files.filter(
      (file) => !removedFiles.includes(file.name)
    );

    // Append only non-removed files
    filesToUpload.forEach((file) => {
      formData.append('images', file);
    });

    try {
      await eventService.createEvent(formData);
      MySwal.fire({
        title: 'Success!',
        text: 'Event created successfully!',
        icon: 'success',
      });
      setIsAddEventOpen(false);
      setFiles([]);
      setAddEventImages([]);
      setRemovedFiles([]);
      setEventName('');
      setEventLocation('');
      setEventTime(new Date().toISOString().split('T')[0]);
      setEventDescription('');
      setAudienceType('all');
      setPrice('');
      setNoOfTickets('');
      setSelectedUsers([]);
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: 'Error!',
        text: 'Failed to create event. Please try again.',
        icon: 'error',
      });
    }
  };

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const removeUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const options = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
    },
    stroke: {
      curve: 'smooth',
      colors: ['#900C3F'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        colorStops: [
          { offset: 0, color: '#900C3F', opacity: 0.8 },
          { offset: 100, color: '#900C3F', opacity: 0 },
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      colors: ['#900C3F'],
      strokeColors: '#900C3F',
      strokeWidth: 2,
    },
    tooltip: {
      theme: 'light',
      marker: {
        fillColors: ['#900C3F'],
      },
    },
  };

  const series = [
    {
      name: 'Users',
      data: chartData.monthlyData,
    },
  ];

  const optionsDonut = {
    chart: {
      type: 'donut',
    },
    colors: ['#FFCC00', '#900C3F'],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const seriesDonut = chartData.eventTypeDistribution.map(type =>
    parseFloat(type.percentage || 0)
  );

  console.log('Chart series:', series);
  console.log('Donut series:', seriesDonut);

  const optionsColumn = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: window.innerWidth > 600 ? '30%' : '65%',
      },
    },
    dataLabels: {
      enabled: false, // This removes only the numbers on the bars
    },
    colors: ['#900C3F'],
    yaxis: {
      labels: {
        formatter: (value) => `${value}K`,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  };

  const seriesColumn = [
    {
      name: 'Earnings',
      data: Array.from({ length: 12 }, (_, i) => {
        const monthData = dashboardStats?.monthlyRevenue?.find(
          item => item._id === i + 1
        );
        return monthData ? monthData.revenue / 1000 : 0;
      })
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (statsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }


  return (
    <div className='space-y-4 md:p-6'>
      {/* <div className="p-6 space-y-6"> */}
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex-1 max-w-2xl mx-auto px-4'>
          <div className='relative'>
            <BiSearch className='absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg' />
            <input
              type='text'
              placeholder='Search...'
              className='w-full px-8 py-2.5 rounded-full  border border-gray-400 focus:outline-none text-sm'
            />
          </div>
        </div>
        <Profile />
      </div>
      {/* Header with Create Event button */}
      <button
        className='bg-primary font-secondary text-white px-4 py-2.5 rounded-md flex items-center gap-2 text-sm'
        onClick={() => setIsAddEventOpen(true)}
      >
        <span>Create Event</span>
        <IoMdAdd className='text-xl' />
      </button>

      {/* Stats Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        <StatCard
          icon={<BsPeople className='text-xl' />}
          label='Total Members'
          value={dashboardStats?.totalMembers?.toLocaleString() || '0'}
          IconWrapper={({ children }) => (
            <div className='bg-[#F0F6FF] text-[#2F6FED] p-3 rounded-lg'>
              {children}
            </div>
          )}
        />
        <StatCard
          icon={<BsClock className='text-xl' />}
          label='Pending Registrations'
          value={dashboardStats?.pendingRegistrations?.toLocaleString() || '0'}
          IconWrapper={({ children }) => (
            <div className='bg-[#FFF8EC] text-[#FDB022] p-3 rounded-lg'>
              {children}
            </div>
          )}
        />
        <StatCard
          icon={<FaUserTimes className='text-xl' />}
          label='Non-Engaged Users'
          value={dashboardStats?.nonEngagedUsers?.toLocaleString() || '0'}
          IconWrapper={({ children }) => (
            <div className='bg-[#FFF0F0] text-[#F04438] p-3 rounded-lg'>
              {children}
            </div>
          )}
        />
        {/* <StatCard
          icon={<IoSparkles className='text-xl' />}
          label='Total Events'
          value={dashboardStats?.totalEvents?.toLocaleString() || '0'}
          IconWrapper={({ children }) => (
            <div className='bg-[#F0FFF4] text-[#12B76A] p-3 rounded-lg'>
              {children}
            </div>
          )}
        /> */}
        <StatCard
          icon={<IoSparkles className='text-xl' />}
          label='Total Events'
          value={(dashboardStats?.totalEvents || 0).toLocaleString()}
          IconWrapper={({ children }) => (
            <div className='bg-[#F0FFF4] text-[#12B76A] p-3 rounded-lg'>
              {children}
            </div>
          )}
        />
      </div>
      {/* Analytics Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='col-span-2 bg-white rounded-lg p-6 shadow-xl'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h2 className='text-xl font-semibold'>User Management</h2>
            </div>
            <div className='flex items-center gap-3'>
              <div className="flex items-center space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="banned">Banned</option>
                  <option value="restricted">Restricted</option>
                  <option value="deactivated">Deactivated</option>
                  <option value="closed">Closed Account</option>
                </select>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Time</option>
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='h-[350px] bg-white rounded-lg'>
            <Chart options={options} series={series} type='area' height={350} />
          </div>
        </div>
        {/*"Donut Desktop"*/}
        <div className='hidden md:block bg-white rounded-lg p-6 shadow-xl'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-xl font-semibold'>Event Type</h2>
          </div>
          <div className='h-[350px]'>
            <div className='mb-6'>
              <Chart
                options={optionsDonut}
                series={seriesDonut}
                type='donut'
                height={350}
              />
            </div>
            <div className='space-y-3'>
              {chartData.eventTypeDistribution.map((type, index) => (
                <EventTypeRow
                  key={index}
                  color={index === 0 ? '#900C3F' : '#FFD700'}
                  label={type?.type ? type.type.toUpperCase() : 'Unknown'}
                  percentage={`${type?.percentage || 0}%`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*"Donut Mobile"*/}
      <div className='md:hidden bg-white rounded-lg p-6 shadow-xl '>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-semibold'>Event Type</h2>
        </div>
        <div className='h-full'>
          <div className='mb-6'>
            {/* Donut chart placeholder */}
            <Chart
              options={optionsDonut}
              series={seriesDonut}
              type='donut'
              height={350}
            />
          </div>
          <div className='space-y-3'>
            {chartData.eventTypeDistribution.map((type, index) => (
              <EventTypeRow
                key={index}
                color={index === 0 ? '#900C3F' : '#FFD700'}
                label={type?.type ? type.type.toUpperCase() : 'Unknown'}
                percentage={`${type?.percentage || 0}%`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Revenue Section - adjusted height */}
      <div className=' bg-white rounded-lg p-6 w-full shadow-xl  mb-10 overflow-auto'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-semibold'>Revenue</h2>
        </div>
        <div className='relative pt-6'>
          {/* Y-axis labels */}
          <Chart
            options={optionsColumn}
            series={seriesColumn}
            type='bar'
            height={350}
          />
        </div>
      </div>
      <br />
      <br />
      <Modal
        isOpen={isAddEventOpen}
        onRequestClose={() => setIsAddEventOpen(false)}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg md:w-[600px] w-[95vw] max-h-[80vh] overflow-y-auto will-change-transform'
        overlayClassName='fixed inset-0 bg-black/50 z-1000'
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold'>Add Event</h2>
            <button
              onClick={() => setIsAddEventOpen(false)}
              className='text-gray-400 hover:text-gray-600'
            >
              ✕
            </button>
          </div>

          <div className='space-y-4'>
            {/* Event Name */}
            <div>
              <label className='block mb-1'>Event Name</label>
              <input
                type='text'
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder='Enter event name'
                className='w-full px-4 py-2 border rounded-lg text-gray-600'
              />
            </div>

            {/* Location and Time */}
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block mb-1'>Location</label>
                <input
                  type='text'
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder='Enter event location'
                  className='w-full px-4 py-2 border rounded-lg text-gray-600'
                />
              </div>
              <div>
                <label className='block mb-1'>Time</label>
                <div className='relative'>
                  <input
                    type='date'
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder='Enter event time'
                    className='w-full px-4 py-2 border rounded-lg text-gray-600'
                  />
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <label className='block mb-1'>Event Description</label>
              <textarea
                rows={6}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder='Enter event description'
                className='w-full px-4 py-2 border rounded-lg text-gray-600 resize-none'
              />
            </div>

            {/* Audience Type and Price */}
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block mb-1'>Audience Type</label>
                <select
                  className='w-full px-4 py-2 border rounded-lg text-gray-600  bg-white'
                  defaultValue={audienceType}
                  onChange={(e) => setAudienceType(e.target.value)}
                >
                  <option value='' disabled>
                    Enter who can attend?
                  </option>
                  <option value='all'>Public</option>
                  <option value='vip'>VIP Members</option>
                  <option value='members'>Standard Members</option>
                </select>
              </div>
              <div>
                <label className='block mb-1'>Price</label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Enter the price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className='w-full px-4 py-2 border rounded-lg text-gray-600'
                  />
                  <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'>
                    ℹ
                  </span>
                </div>
              </div>
            </div>

            {/* No of Tickets */}
            <div>
              <label className='block mb-1'>No of Tickets</label>
              <input
                type='text'
                value={noOfTickets}
                onChange={(e) => setNoOfTickets(e.target.value)}
                placeholder='Enter the no of tickets'
                className='w-full px-4 py-2 border rounded-lg text-gray-600'
              />
            </div>

            {/* Attending members */}
            <div>
              <label className='block mb-1'>Attending members</label>
              <div className='flex gap-4'>
                <div className='relative flex-1'>
                  <BiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input
                    type='text'
                    placeholder='Search members'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full pl-10 pr-4 py-2 border rounded-lg text-gray-600'
                  />
                </div>
                <button className='px-6 py-2 bg-primary text-white rounded-lg'>
                  Invite Users
                </button>
              </div>
              <div>
                {selectedUsers.length > 0 && (
                  <div className='flex flex-wrap p-4 m-2 rounded-lg border-gray-200 border gap-2 mb-2'>
                    {selectedUsers.map((user) => (
                      <div
                        key={user.id}
                        className='flex items-center gap-3 pr-3 border border-gray-200 bg-white shadow-2xl rounded-full'
                      >
                        <img
                          src={user.avatar}
                          alt='Avatar'
                          className='w-8 h-8 rounded-full object-cover'
                        />
                        <span>{user.name}</span>
                        <button
                          onClick={() => removeUser(user.id)}
                          className='text-black'
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className='border rounded-lg h-[120px] overflow-y-auto'>
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={` items-center gap-2 p-2 ${selectedUsers.some((u) => u.id === user.id)
                        ? 'hidden'
                        : 'flex'
                      }`}
                  >
                    <input
                      type='checkbox'
                      className='mx-2'
                      checked={selectedUsers.some((u) => u.id === user.id)}
                      onChange={() => handleCheckboxChange(user)}
                    />
                    <img
                      src={user.avatar}
                      alt='Avatar'
                      className='w-8 h-8 rounded-full object-cover'
                    />
                    <span className='ml-4'>{user.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Image */}
            <div>
              <label className='block mb-1'>Event Image</label>
              <div className='flex gap-4 flex-wrap'>
                <label className='w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50'>
                  <span className='text-2xl text-gray-400'>+</span>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    className='hidden'
                    onChange={handleFileChange}
                  />
                </label>
                {addEventImages.map((image, index) => (
                  <div
                    key={index}
                    className='w-24 h-24 rounded-lg overflow-hidden relative group'
                  >
                    <img
                      src={image}
                      alt=''
                      className='w-full h-full object-cover'
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className='absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-end gap-3 pt-4'>
              <button
                onClick={() => setIsAddEventOpen(false)}
                className='px-6 py-2 border rounded-lg'
              >
                Cancel
              </button>
              <button
                className='px-6 py-2 bg-primary text-white rounded-lg'
                onClick={() => {
                  setIsAddEventOpen(false);
                  showModal({
                    title: 'Success!',
                    message: 'Created Event Successfully!',
                    confirmText: 'Ok',
                    onConfirm: () => {
                      console.log('Confirmed!');
                      handleEventCreate();
                    },
                  });
                }}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
const StatCard = ({ icon, label, value, IconWrapper }) => (
  <div className='bg-white p-4 rounded-lg shadow-xl'>
    <div className='flex items-start justify-between'>
      <div>
        <p className='text-gray-500 text-sm mb-2'>{label}</p>
        <h3 className='text-xl font-semibold'>{value}</h3>
      </div>
      <IconWrapper>{icon}</IconWrapper>
    </div>
  </div>
);
const EventTypeRow = ({ color, label, percentage }) => (
  <div className='flex items-center justify-between'>
    <div className='flex items-center gap-2'>
      <div
        className='w-3 h-3 rounded-full'
        style={{ backgroundColor: color }}
      ></div>
      <span className='text-sm'>{label}</span>
    </div>
    <span className='text-sm text-green-500'>{percentage}</span>
  </div>
);
export default Dashboard;
