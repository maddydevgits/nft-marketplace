App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load nfts.
    $.getJSON('../nfts.json', function(data) {
      var nftsRow = $('#nftsRow');
      var nftTemplate = $('#nftTemplate');

      for (i = 0; i < data.length; i ++) {
        nftTemplate.find('.panel-title').text(data[i].name);
        nftTemplate.find('img').attr('src', data[i].picture);
        nftTemplate.find('.nft-breed').text(data[i].breed);
        nftTemplate.find('.nft-age').text(data[i].age);
        nftTemplate.find('.nft-location').text(data[i].location);
        nftTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        nftsRow.append(nftTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    /*
     * Replace me...
     */
	if(window.web3) {
		App.web3Provider = window.web3.currentProvider;
		console.log('metamask');
	}
	else {
		App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
	}
	web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */
	$.getJSON('NFT.json', function(data) {
		var AdoptionArtifact = data;
		App.contracts.Adoption=TruffleContract(AdoptionArtifact);
		console.log('Artifact loaded');

		App.contracts.Adoption.setProvider(App.web3Provider);
		return App.markAdopted();
	});

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
	var adoptionInstance;
	App.contracts.Adoption.deployed().then(function(instance) {
		adoptionInstance = instance;
		return adoptionInstance.getBuyers.call();
	}).then(function(adopters) {
		for(i=0;i<adopters.length;i++) {
			if(adopters[i]!='0x0000000000000000000000000000000000000000') {
				$('.panel-nft').eq(i).find('button').text('Sold Out').attr('disabled',true);
			}
		}
	}).catch(function(err) {
		console.log(err.message);
	});
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var nftId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
	var adoptionInstance;
	web3.eth.getAccounts(function(error,accounts) {
		if(error) {
			console.log(error);
		}
		var account = accounts[0];
		console.log(accounts);

		App.contracts.Adoption.deployed().then(function(instance) {
			adoptionInstance = instance;
			return adoptionInstance.buy(nftId,{from: account});
		}).then(function(result) {
			return App.markAdopted();
		}).catch(function(err) {
			console.log(err.message);
		});
	});
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
