import { LeaseType } from 'types';
import { setPopUpData } from '@redux/actions';
import { formatDate } from 'Utils/date';

function getRejectData(lease: LeaseType) {
  if (lease.status === 'DECLINED') {
    // const reasons = lease.message.split('/');
    return [{ att: 'reject', label: 'Decline reasons', detail: lease.message }];
  }
  return [];
}

export function getData(lease: LeaseType, dispatch) {
  return [
    { att: '_id', label: 'ID', value: lease._id, hide: true },
    {
      att: 'customer',
      label: 'Customer',
      detail: lease.customer.fullName,
      pressable: true,
      onItemPress() {
        setPopUpData(dispatch)({
          popupType: 'profile',
          description: lease.customer,
        });
      },
      nextIcon: 'next',
    },
    {
      att: 'startDate',
      label: 'From date',
      detail: formatDate(lease.startDate),
    },
    {
      att: 'endDate',
      label: 'To date',
      detail: formatDate(lease.endDate),
    },
    {
      att: 'carId',
      label: 'Car model',
      detail: lease.car.carModel.name,
    },
    {
      att: 'odometer',
      label: 'Car model',
      detail: lease.car.odometer,
    },
    {
      att: 'using',
      label: 'Using years',
      detail: lease.car.usingYear,
    },

    { att: 'type', label: 'Type', detail: 'Lease request' },
    ...getRejectData(lease),
  ];
}

export function getActionType(lease: LeaseType): string {
  if (lease.status === 'PENDING') {
    return 'accept-decline';
  }
  if (lease.status === 'ACCEPTED') {
    return 'transaction-accept-decline';
  }
  if (lease.status === 'WAIT_TO_RETURN') {
    return 'transaction';
  }
  return '';
}
