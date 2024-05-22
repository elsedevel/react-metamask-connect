import { configPolygon } from "./chain";

export const Web3Helper = {
    async connect() {
        const { ethers } = require("ethers");
        const { ethereum } = typeof window !== "undefined" ? window : {};
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        const config = await configPolygon();

        let provider;
        let caller;

        if(metamaskIsInstalled) {
            provider = new ethers.BrowserProvider(ethereum);
            caller = await provider.getSigner();

            try {
                const accounts = await provider.send("eth_requestAccounts", []);

                try {
                    const currentChainId = await ethereum.request({
                        method: "eth_chainId",
                    });

                    if(currentChainId !== config.NETWORK.CHAIN_ID) {
                        try {
                            await ethereum.request({
                                method: "wallet_switchEthereumChain",
                                params: [{ chainId: config.NETWORK.CHAIN_ID }],
                            });
                            console.log("You have switched to the right network");
                        } catch (switchError) {
                            // The network has not been added to MetaMask
                            if (switchError.code === 4902) {
                                console.log("Please add network to MetaMask");
                                await ethereum.request({
                                    method: "wallet_addEthereumChain",
                                    params: [
                                        {
                                        chainId: config.NETWORK.CHAIN_ID,
                                        chainName: config.NETWORK.CHAIN_NAME,
                                        rpcUrls: config.NETWORK.RPC_URLS,
                                        blockExplorerUrls:
                                            config.NETWORK.BLOCK_EXPLORER_URLS,
                                        nativeCurrency: {
                                            symbol: config.NETWORK.SYMBOL,
                                            name: config.NETWORK.NAME,
                                            decimals: config.NETWORK.DECIMALS,
                                        },
                                        },
                                    ],
                                });
                            }
                            console.log("Cannot switch to the network", switchError);
                        }
                    }
                } catch (e) {
                    console.log("CHECKING NETWORK ERROR ==>", e);
                }


                // Add listeners start
                ethereum.on("accountsChanged", (accounts) => {
                    window.location.reload();
                });
                ethereum.on("chainChanged", () => {
                    window.location.reload();
                });

                return accounts;
            } catch (e) {
                console.log("Connect Account ERROR ==>", e);
            }
        }
    }
};