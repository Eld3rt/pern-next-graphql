import { CircularProgress } from '@mui/material'

interface Props {}

const LoadingModal: React.FC<Props> = () => {
  return (
    <div className="modal-loading">
      <CircularProgress size={24} sx={{ color: '#732a46' }} />
    </div>
  )
}

export default LoadingModal
