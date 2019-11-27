import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Linking } from 'react-native'
import { withNavigation, SafeAreaView } from 'react-navigation'
import { withTheme } from 'react-native-paper'
import { BlockchainRenderer } from 'common/blockchain'
import Config from 'react-native-config'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import { OMGButton, OMGText, OMGStatusBar, OMGIcon } from 'components/widgets'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ExitPending = ({ theme, navigation }) => {
  const pendingTx = navigation.getParam('pendingTx')
  const token = navigation.getParam('token')
  const tokenPrice = BlockchainRenderer.renderTokenPrice(
    token.balance,
    token.price
  )
  const tokenBalance = BlockchainRenderer.renderTokenBalance(token.balance)
  const handleOnBackPressedAndroid = () => {
    return true
  }

  return (
    <AndroidBackHandler onBackPress={handleOnBackPressedAndroid}>
      <SafeAreaView style={styles.container(theme)}>
        <OMGStatusBar
          barStyle='dark-content'
          backgroundColor={theme.colors.white}
        />
        <View style={styles.contentContainer}>
          <View style={styles.iconPending(theme)}>
            <OMGIcon name='pending' size={24} style={styles.icon(theme)} />
          </View>
          <View style={styles.headerContainer}>
            <OMGText style={styles.title(theme)} weight='bold'>
              Pending Exit Transaction
            </OMGText>
          </View>
          <OMGText weight='bold' style={styles.amountText}>
            Amount
          </OMGText>
          <View style={styles.amountContainer(theme)}>
            <OMGText style={styles.tokenBalance(theme)}>
              {tokenBalance} {token.tokenSymbol}
            </OMGText>
            <OMGText style={styles.tokenPrice(theme)}>{tokenPrice} USD</OMGText>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <OMGButton
            style={styles.button(theme)}
            textStyle={styles.buttonText(theme)}
            onPress={() => {
              navigation.navigate({ routeName: 'Balance' })
            }}>
            Done
          </OMGButton>
          <TouchableOpacity
            style={styles.trackEtherscanButton}
            onPress={() => {
              Linking.openURL(`${Config.ETHERSCAN_TX_URL}${pendingTx.hash}`)
            }}>
            <OMGText style={styles.trackEtherscanText(theme)}>
              Track on Etherscan
            </OMGText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </AndroidBackHandler>
  )
}

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.white
  }),
  contentContainer: {
    flex: 1,
    marginTop: 16,
    padding: 16
  },
  iconPending: theme => ({
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.yellow3,
    justifyContent: 'center',
    alignItems: 'center'
  }),
  icon: theme => ({
    color: theme.colors.white
  }),
  amountContainer: theme => ({
    marginTop: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.black4,
    borderRadius: theme.roundness
  }),
  amountText: {
    marginTop: 32
  },
  tokenBalance: theme => ({
    color: theme.colors.primary
  }),
  tokenPrice: theme => ({
    color: theme.colors.gray2
  }),
  headerContainer: {
    marginTop: 32
  },
  addressContainer: {
    marginTop: 16,
    paddingLeft: 16
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16
  },
  title: theme => ({
    fontSize: 18,
    color: theme.colors.gray3
  }),
  button: theme => ({
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray3,
    borderWidth: 1
  }),
  buttonText: theme => ({
    color: theme.colors.gray3
  }),
  trackEtherscanButton: {
    padding: 8,
    marginTop: 16
  },
  trackEtherscanText: theme => ({
    color: theme.colors.gray3
  })
})

const mapStateToProps = (state, ownProps) => ({
  pendingTxs: state.transaction.pendingTxs,
  loading: state.loading,
  provider: state.setting.provider,
  wallet: state.wallets.find(
    wallet => wallet.address === state.setting.primaryWalletAddress
  )
})

export default connect(
  mapStateToProps,
  null
)(withNavigation(withTheme(ExitPending)))
