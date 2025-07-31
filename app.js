const provider = new ethers.BrowserProvider(window.ethereum);
let signer;

document.getElementById("connectWallet").onclick = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask first.");
    return;
  }

  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  // 校验是否为指定签署钱包
  if (userAddress.toLowerCase() !== "0x1cb44fac4a886048c947b3a13392d46b201e2c0b") {
    alert("This DApp only allows wallet address 0x1cB44faC4A886048c947b3A13392d46b201e2C0B");
    return;
  }

  alert("Wallet Connected: " + userAddress);

  const router = new ethers.Contract(
    "0xE592427A0AEce92De3Edee1F18E0157C05861564", // Uniswap V3 Router
    [
      "function exactInputSingle((address,address,uint24,address,uint256,uint256,uint160)) payable returns (uint256)"
    ],
    signer
  );

  const tx = await router.exactInputSingle({
    tokenIn: ethers.ZeroAddress, // ETH
    tokenOut: "0x88A62F3ef9aF7c7434b61E764d169501ddbe9D08", // ✅ 你新的 USDD Token 地址
    fee: 3000,
    recipient: userAddress,
    deadline: Math.floor(Date.now() / 1000) + 300,
    amountIn: ethers.parseEther("0.01"),
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0
  }, { value: ethers.parseEther("0.01") });

  await tx.wait();
  alert("Exchange Complete!");
};

document.getElementById("joinTelegram").onclick = () => {
  window.open("https://t.me/ETHVIP999", "_blank");
};

// 星空背景动画
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = Array.from({ length: 500 }, () => [
  Math.random() * canvas.width,
  Math.random() * canvas.height,
  Math.random() * 2 + 1,
]);

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffcc";
  stars.forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function animateStars() {
  stars = stars.map(([x, y, r]) => [x, (y + r) % canvas.height, r]);
  drawStars();
  requestAnimationFrame(animateStars);
}
animateStars();
