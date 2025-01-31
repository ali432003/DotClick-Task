import { motion } from "framer-motion"
import { Cancel } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const PaymentCancelPage = () => {
    const nav = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white mb-8"
      >
        <Cancel sx={{ fontSize: 100 }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center"
      >
        <Typography variant="h4" className="text-white mb-4">
          Payment Cancelled
        </Typography>
        <Typography variant="body1" className="text-white mb-8">
          Your payment has been cancelled. No charges were made.
        </Typography>
        <div className="space-x-4">
          <Button
            onClick={()=> nav('/')}
            variant="contained"
            className="border-white text-white hover:bg-pink-600 transition-colors duration-300"
          >
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default PaymentCancelPage

