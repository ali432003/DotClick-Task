import { motion } from "framer-motion"
import { CheckCircle } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const PaymentSuccessPage = () => {
  const nav = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-white mb-8"
      >
        <CheckCircle sx={{ fontSize: 100 }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center"
      >
        <Typography variant="h4" className="text-white mb-4">
          Payment Successful!
        </Typography>
        <Typography variant="body1" className="text-white mb-8">
          Thank you for your purchase. Your order has been processed.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="bg-white text-green-500 hover:bg-green-100 transition-colors duration-300"
          onClick={()=>nav('/')}
        >
          Back to Home
        </Button>
      </motion.div>
    </div>
  )
}

export default PaymentSuccessPage

