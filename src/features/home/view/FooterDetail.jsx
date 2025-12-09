const FooterDetail = () => {
  return (
    <div className="w-full h-100 bg-gray-900 text-white">
      <div className="container mx-auto h-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-6 py-6">
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-400 border-b border-blue-800 pb-1">Our Developers</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="font-bold">GN</span>
                </div>
                <div>
                  <p className="font-medium">Gena</p>
                  <p className="text-xs text-gray-400">103032300084</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="font-bold">AP</span>
                </div>
                <div>
                  <p className="font-medium">Arik Pramudya</p>
                  <p className="text-xs text-gray-400">103032300084</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="font-bold">SB</span>
                </div>
                <div>
                  <p className="font-medium">Salsabila</p>
                  <p className="text-xs text-gray-400">103032300084</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="font-bold">DB</span>
                </div>
                <div>
                  <p className="font-medium">Delkano Berutu</p>
                  <p className="text-xs text-gray-400">103032300084</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="font-bold">DF</span>
                </div>
                <div>
                  <p className="font-medium">Dafi Fala Tansa</p>
                  <p className="text-xs text-gray-400">103032300084</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="font-bold">AF</span>
                </div>
                <div>
                  <p className="font-medium">Ahmad Faizal</p>
                  <p className="text-xs text-gray-400">103032300084</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-1">Lainnya</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm">FAQ</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm">Kebijakan</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm">Syarat</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm">Kontak</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm">Blog</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition text-sm">Karir</a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-1">Kontak</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope text-blue-400"></i>
                <span className="text-gray-400">travel67@destination.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-phone text-blue-400"></i>
                <span className="text-gray-400">+62 00001111111</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt text-blue-400"></i>
                <span className="text-gray-400">FIF, Telkom University</span>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default FooterDetail;