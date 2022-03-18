<template>
	<div>
		<a-row :gutter="24" type="flex">
			<a-col :span="24" class="mb-24">
				<BlockchainsTable
						:data="tableData"
						:columns="tableColumns"
						:loading="tableLoading"
						@editBlockchain="editBlockchain"
						@addNewBlockchain="titleModal = 'Add New Blockchain'"
				></BlockchainsTable>
			</a-col>
		</a-row>
		<b-modal
				id="blockchainTableModal"
				:title="titleModal"
				size="lg"
				centered
				hide-footer
		>
			<a-form
          :form="form"
					id="components-form-demo-normal-login"
					class="login-form"
			>
        <a-collapse v-if="titleModal === 'Add New Blockchain'" v-model="activeKey" :bordered="false" style="background-color: transparent">
          <a-collapse-panel key="1" header="Required fields">
            <div style="grid-template-columns: repeat(2,1fr);display: grid;">
              <a-form-item class="m-2" v-for="(value, label) in modalDataAdd.required" :label="label.split('_').join(' ').toUpperCase()" :colon="false" has-feedback :validate-status="$v.modalDataAdd.required[label].$invalid ? 'warning' : 'success'">
                <a-input v-model.trim="$v.modalDataAdd.required[label].$model" :disabled="label === 'status'" :placeholder="label.split('_').join(' ').toUpperCase()" />
              </a-form-item>
            </div>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Not required fields" :disabled="false">
            <div style="grid-template-columns: repeat(2,1fr);display: grid;">
              <a-form-item class="m-2" v-for="(value, label) in modalDataAdd.secondary" :label="label.split('_').join(' ').toUpperCase()" :colon="false">
                <a-input v-model="modalDataAdd.secondary[label]" :placeholder="label.split('_').join(' ').toUpperCase()" />
              </a-form-item>
            </div>
          </a-collapse-panel>
        </a-collapse>


        <a-collapse v-if="titleModal === 'Edit Blockchain'" v-model="activeKey" :bordered="false" style="background-color: transparent">
          <a-collapse-panel key="1" header="Required fields">
            <div style="grid-template-columns: repeat(2,1fr);display: grid;">
              <a-form-item  class="m-2" v-for="(value, label) in modalDataEdit.required" :label="label.split('_').join(' ').toUpperCase()" :colon="false" has-feedback :validate-status="$v.modalDataEdit.required[label].$invalid ? 'warning' : 'success'">
                <a-input v-model.trim="$v.modalDataEdit.required[label].$model" :disabled="label === 'status'" :placeholder="label.split('_').join(' ').toUpperCase()" />
              </a-form-item>
            </div>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Not required fields" :disabled="false">
            <div style="grid-template-columns: repeat(2,1fr);display: grid;">
              <a-form-item class="m-2" v-for="(value, label) in modalDataEdit.secondary" :label="label.split('_').join(' ').toUpperCase()" :colon="false">
                <a-input v-model="modalDataEdit.secondary[label]" :placeholder="label.split('_').join(' ').toUpperCase()" />
              </a-form-item>
            </div>
          </a-collapse-panel>
        </a-collapse>

			</a-form>

			<a-form-item class="m-2">
				<a-button v-if="titleModal === 'Add New Blockchain'" type="primary" block @click="postEditorBlockchain" class="login-form-button">ADD NEW BLOCKCHAIN</a-button>
				<a-button v-if="titleModal === 'Edit Blockchain'" type="primary" block @click="putBmBlockchain" class="login-form-button">EDIT BLOCKCHAIN</a-button>
			</a-form-item>

		</b-modal>
	</div>
</template>

<script>
	import { getChains, getCurrencies, getRates, postChain, putChain } from '@/api';
	import { handleError, handleSuccess } from '@/utils/errorsHandler';
	import BlockchainsTable from '../components/Cards/BlockchainsTable' ;
  import { required } from 'vuelidate/lib/validators'

	const tableColumns = [
		{
			title: 'CHAIN',
			dataIndex: 'chain',
			scopedSlots: {
				customRender: 'chain',
				filterDropdown: 'filterDropdown',
				filterIcon: 'filterIcon',
			},
			onFilter: (value, record) =>
					record.chain
							.toString()
							.toLowerCase()
							.includes(value.toLowerCase()),
			onFilterDropdownVisibleChange: visible => {
				if (visible) {
					setTimeout(() => {
						this.searchInput.focus();
					}, 0);
				}
			},
		},
		{
			title: 'VALIDATOR ADDRESS',
			dataIndex: 'validator_address',
			class: 'font-semibold text-muted',
			sorter: (a, b) => a.validator_address.length - b.validator_address.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'CURRENCY CODE',
			dataIndex: 'currency_code',
			class: 'font-semibold text-muted',
		},
		{
			title: 'OUR FEE',
			dataIndex: 'fee',
			class: 'font-semibold text-muted',
		},
		{
			title: 'APR',
			dataIndex: 'apr',
			class: 'font-semibold text-muted',
		},
		{
			title: 'FIRST REWARD HOURS',
			dataIndex: 'first_reward_hours',
			class: 'font-semibold text-muted',
		},
		{
			title: 'REWARD PERIOD HOURS',
			dataIndex: 'reward_period_hours',
			class: 'font-semibold text-muted',
		},
		{
			title: 'UNSTAKE PERIOD HOURS',
			dataIndex: 'unstake_period_hours',
			class: 'font-semibold text-muted',
		},
		{
			title: 'RATE USDT',
			dataIndex: 'usd',
			class: 'font-semibold text-muted',
		},
		{
			title: 'PRECISION',
			dataIndex: 'precision',
			class: 'font-semibold text-muted',
		},
		{
			title: 'MIN STAKE AMOUNT',
			dataIndex: 'min_stake_amount',
			class: 'font-semibold text-muted',
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			class: 'font-semibold text-muted text-sm',
			filters: [
				{ text: 'in development', value: 'in development' },
				{ text: 'active', value: 'active' },
			],
			onFilter: (value, record) => record.status.indexOf(value) === 0,
		},
		{
			title: 'NOTICE',
			dataIndex: 'notice',
			class: 'font-semibold text-muted text-sm',
		},
		{
			title: '',
			scopedSlots: { customRender: 'editBtn' },
			width: 50,
		},
	];
	export default ({
		name: 'Tables',
		components: {
			BlockchainsTable,
		},
		data() {
			return {
        form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        activeKey: ['1'],
				tableColumns: tableColumns,
				tableData: [],
				tableLoading: false,
				titleModal: '',
				modalDataEdit: {},
				modalDataAdd: {
          required: {
            chain: "",
            currency_code: "",
            precision: "",
            status: "in development",
          },
          secondary: {
            validator_address: "",
            fee: null,
            apr: null,
            first_reward_hours: null,
            reward_period_hours: null,
            unstake_period_hours: null,
            min_stake_amount: null,
            notice: "",
          },
				}
			}
		},
    validations: {
      modalDataAdd: {
        required: {
          chain: {
            required,
          },
          currency_code: {
            required,
          },
          precision: {
            required,
          },
          status: {
            required,
          },
        },
      },
      modalDataEdit: {
        required: {
          chain: {
            required,
          },
          currency_code: {
            required,
          },
          precision: {
            required,
          },
          status: {
            required,
          },
        },
      }
    },
		created() {
			this.getEditorBlockchain();
		},
		methods: {
			editBlockchain(value) {
        this.modalDataEdit = {
          required: {
            chain: value.chain,
            currency_code: value.currency_code,
            precision: value.precision,
            status: value.status,
          },
          secondary: {
            validator_address: value.validator_address,
            fee: value.fee,
            apr: value.apr,
            first_reward_hours: value.first_reward_hours,
            reward_period_hours: value.reward_period_hours,
            unstake_period_hours: value.unstake_period_hours,
            min_stake_amount: value.min_stake_amount,
            notice: value.notice,
          },
          chain_id: value.chain_id,
          currency_id: value.currency_id,
        };
				this.titleModal = 'Edit Blockchain';
			},
			async getEditorBlockchain() {
				try {
					this.tableLoading = true;
					const chains = await getChains();
					const currencies = await getCurrencies();
					const rates = await getRates();
					this.tableData.length = 0;
          chains.data.forEach(chain => {
            currencies.data.forEach(currency => {
              if (chain.currency_id === currency.currency_id) {
                const rate = rates.data[currency.currency_code];
								this.tableData.push({
									...currency, ...chain, ...rate
								})
							}
						})
					});
				} catch (e) {
					handleError(e);
				} finally {
					this.tableLoading = false;
				}
			},
			async postEditorBlockchain() {
        try {
          if(!this.$v.modalDataAdd.$invalid) {
            const payload = {
              chain: this.modalDataAdd.required.chain,
              precision: +this.modalDataAdd.required.precision,
              status: this.modalDataAdd.required.status,
              currency_code: this.modalDataAdd.required.currency_code,
              validator_address: this.modalDataAdd.secondary.validator_address,
              fee: +this.modalDataAdd.secondary.fee,
              apr: +this.modalDataAdd.secondary.apr,
              first_reward_hours: +this.modalDataAdd.secondary.first_reward_hours,
              reward_period_hours: +this.modalDataAdd.secondary.reward_period_hours,
              unstake_period_hours: +this.modalDataAdd.secondary.unstake_period_hours,
              min_stake_amount: +this.modalDataAdd.secondary.min_stake_amount,
              notice: this.modalDataAdd.secondary.notice,
            };
            await postChain(payload);
            this.$bvModal.hide('blockchainTableModal');
            handleSuccess('Blockchain added successfully!');
            this.$v.modalDataAdd.$reset();
            this.activeKey = ['1'];
            await this.getEditorBlockchain();
          }
				} catch (e) {
					handleError(e);
				}
			},
			async putBmBlockchain() {
				try {
          if(!this.$v.modalDataEdit.$invalid) {
            const payload = {
              chain: this.modalDataEdit.required.chain,
              precision: +this.modalDataEdit.required.precision,
              // status: this.modalDataEdit.required.status,
              currency_code: this.modalDataEdit.required.currency_code,
              validator_address: this.modalDataEdit.secondary.validator_address,
              fee: +this.modalDataEdit.secondary.fee,
              apr: +this.modalDataEdit.secondary.apr,
              first_reward_hours: +this.modalDataEdit.secondary.first_reward_hours,
              reward_period_hours: +this.modalDataEdit.secondary.reward_period_hours,
              unstake_period_hours: +this.modalDataEdit.secondary.unstake_period_hours,
              min_stake_amount: +this.modalDataEdit.secondary.min_stake_amount,
              notice: this.modalDataEdit.secondary.notice,
              chain_id: +this.modalDataEdit.chain_id,
              currency_id: +this.modalDataEdit.currency_id,
            };
            await putChain(payload);
            this.$bvModal.hide('blockchainTableModal');
            handleSuccess('Blockchain edited successfully!');
            this.$v.modalDataEdit.$reset();
            this.activeKey = ['1'];
            await this.getEditorBlockchain();
          }
				} catch (e) {
					handleError(e);
				}
			},
		}
	})

</script>

<style lang="scss">
</style>
