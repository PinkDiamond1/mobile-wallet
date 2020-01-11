import { transaction } from '@omisego/omg-js-util'
import { ContractABI } from 'common/utils'
import { TransactionActionTypes, ContractAddress } from 'common/constants'
import InputDataDecoder from 'ethereum-input-data-decoder'

const plasmaInputDecoder = new InputDataDecoder(ContractABI.plasmaAbi())

export const encodeMetadata = metadata => {
  return transaction.encodeMetadata(metadata)
}

export const decodeMetadata = encodedMetadata => {
  return transaction.decodeMetadata(encodedMetadata)
}

export const decodePlasmaInputMethod = input => {
  return plasmaInputDecoder.decodeData(input).method
}

export const isReceiveTx = (walletAddress, toAddress) => {
  if (!toAddress) return false
  return walletAddress.toLowerCase() === toAddress.toLowerCase()
}

export const isPlasmaCallTx = tx => {
  return [
    ContractAddress.PLASMA_FRAMEWORK_CONTRACT_ADDRESS,
    ContractAddress.PAYMENT_EXIT_GAME_CONTRACT_ADDRESS
  ].includes(tx.to)
}

export const isUnconfirmStartedExitTx = tx => {
  return (
    tx.actionType === TransactionActionTypes.TYPE_CHILDCHAIN_EXIT && !tx.status
  )
}

export const isConfirmedStartedExitTx = tx => {
  return (
    tx.actionType === TransactionActionTypes.TYPE_CHILDCHAIN_EXIT &&
    tx.status === 'started'
  )
}

export const isReadyToProcessExitTx = tx => {
  return (
    tx.actionType === TransactionActionTypes.TYPE_CHILDCHAIN_EXIT &&
    tx.status === 'ready'
  )
}
